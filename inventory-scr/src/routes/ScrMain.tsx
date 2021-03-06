import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchScr } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    max-width: 480px;
    padding: 0px 20px;
    margin: 0 auto;
    .infoText{
        width: 480px;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        color:${(props) => props.theme.scrTextColor};
        display: block;
        }
`;

const MapContainer = styled.div`
    max-width: 480px;
    height: 600px;
`;
const Header = styled.header`
  width: 480px;
  margin: 0 auto;
  height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

const Title = styled.h1`
    font-size: 30px;
    color: #7d70db;
    font-weight: bold;
    max-width: 480px;
  margin: 0 auto;
  img{
      width: 35px;
  }
`;

const Switch = styled.span`
    margin-left: 10px;
.switch-button {
       position: relative; 
       display: inline-block; 
       width: 55px; 
       height: 30px; 
    }
    .switch-button input { 
        opacity: 0; 
        width: 0; 
        height: 0; 
    }
    .onoff-switch {
         position: absolute; 
         cursor: pointer; 
         top: 0; 
         left: 0; 
         right: 0; 
         bottom: 0; 
         border-radius:20px; 
         background-color: #ccc; 
         box-shadow: inset 1px 5px 1px #999; 
         -webkit-transition: .4s; 
         transition: .4s; 
        }
        .onoff-switch:before {
             position: absolute; 
             content: ""; 
             height: 22px; 
             width: 22px; 
             left: 4px; 
             bottom: 4px; 
             background-color: #fff; 
             -webkit-transition: .5s; 
             transition: .4s; 
             border-radius:20px; 
            }
            .switch-button input:checked + .onoff-switch {
                 background-color: #F2D522; 
                 box-shadow: inset 1px 5px 1px #E3AE56; 
                }
            .switch-button input:checked + .onoff-switch:before {
                 -webkit-transform: translateX(26px);
                  -ms-transform: translateX(26px);
                   transform: translateX(26px);
                 }

`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const ScrList = styled.ul`
    width: 480px;
    margin-top: 12px;
`;

const Scr = styled.li`
    background-color: white;
    border-radius: 15px;
    padding: 10px 20px;
    line-height: 20px;
    h1{
        font-size: 20px;
        font-weight: bold;
        line-height: 25px;
    }
    h2{
        font-size: 18px;
        font-weight: bold;
    }
`;


interface IScr {
    addr: string,       //????????? ??????
    code: string,       //????????? ??????
    inventory: string,  //?????????
    lat: string,        //????????? ??????
    lng: string,        //????????? ??????
    name: string,       //????????? ??????
    openTime: string,   //????????????
    price: string,      //????????? ??????
    regDt: string,      //???????????? ??????
    tel: string,        //????????? ????????????
    color: string,      //?????? ?????? ??????
    data: any,
}

interface IFindScr {
    addr: string,       //????????? ??????
    code: string,       //????????? ??????
    inventory: string,  //?????????
    lat: string,        //????????? ??????
    lng: string,        //????????? ??????
    name: string,       //????????? ??????
    openTime: string,   //????????????
    price: string,      //????????? ??????
    regDt: string,      //???????????? ??????
    tel: string,        //????????? ????????????
    color: string,      //?????? ?????? ??????
}

function ScrMain() {
    const { isLoading, data } = useQuery<IScr>("allScr", fetchScr, { refetchInterval: 300000, });
    const scrData = data?.data;

    const [findScr, setFindScr] = useState<IFindScr>();


    // ???????????? API
    const { kakao } = window;

    function KakaoMapScript() {
        const container = document.getElementById('myMap');
        const scrData = data?.data;

        // ????????????, ????????????
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                const options = {
                    center: new kakao.maps.LatLng(lat, lon),
                    level: 5
                }
                const map = new kakao.maps.Map(container, options);

                let markerPosition = new kakao.maps.LatLng(lat, lon);

                let marker = new kakao.maps.Marker({
                    position: markerPosition,
                    title: "?????? ??????"
                });

                marker.setMap(map);

                // ????????? ?????? ??????
                for (let i = 0; i < scrData?.length; i++) {
                    let latlng = new kakao.maps.LatLng(scrData[i].lat, scrData[i].lng);

                    let imageSrc = "/img/scrImg.png";
                    let imageSize = new kakao.maps.Size(35, 35);
                    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                    let markers = new kakao.maps.Marker({
                        map: map,
                        position: latlng,
                        title: scrData[i].name + scrData[i].inventory + "L",
                        text: scrData[i].name + scrData[i].inventory + "L",
                        image: markerImage
                    });

                    markers.setMap(map);

                    // ????????? ?????? ????????? ?????? ??????
                    let infoText = `${scrData[i].name} ??????: ${scrData[i].inventory}L`;
                    let iwContent = `
                    <div style="padding:5px; width:300px;">
                    ${infoText}
                    <br>
                    <a href="https://map.kakao.com/link/map/${scrData[i].name},${scrData[i].lat},${scrData[i].lng}" style="color:blue" target="_blank">???????????????</a> 
                    <a href="https://map.kakao.com/link/to/${scrData[i].name},${scrData[i].lat},${scrData[i].lng}" style="color:blue" target="_blank">?????????</a></div>'
                    </div>`,
                        iwRemoveable = true;

                    let infowindow = new kakao.maps.InfoWindow({
                        content: iwContent,
                        removable: iwRemoveable
                    });
                    kakao.maps.event.addListener(markers, 'click', function () {
                        infowindow.open(map, markers);

                        function mapOnClick(scrCode: string) {
                            if (scrData[i].code === scrCode) {
                                const findScr = scrData[i];
                                return findScr;
                            }
                        }

                        const findScr = mapOnClick(scrData[i].code);
                        setFindScr(findScr);

                    }); // kakao addLister End

                }
            }
            );
        }   // if End
    };  // KakaoMapScript() End
    useEffect(() => {
        KakaoMapScript();
    }, [isLoading]);

    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

    return (
        <Container>
            <Header>
                <Title>
                    <img src="img/scrImg.png"></img>
                    ????????? ?????? ??????{isLoading ? "(Loading...)" : `(${scrData?.length})`}
                    <Switch>
                        <label className="switch-button">
                            <input type="checkbox" onChange={toggleDarkAtom} ></input>
                            <span className="onoff-switch"></span>
                        </label>
                    </Switch>
                </Title>
            </Header>
            <MapContainer>
                <div id='myMap' style={{
                    width: '480px',
                    height: '600px'
                }}>
                </div>
            </MapContainer>
            <br />

            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <span className="infoText"> *5????????? ???????????? ?????? ?????? ????????? ????????? ?????? ??? ????????????.</span>
                    <ScrList>
                        <Link to={{
                            pathname: `/${findScr?.code}`,
                            state: {
                                name: findScr?.name,
                                inventory: findScr?.inventory,
                                addr: findScr?.addr,
                                price: findScr?.price,
                                tel: findScr?.tel,
                                regDt: findScr?.regDt,
                                lat: findScr?.lat,
                                lng: findScr?.lng,
                                openTime: findScr?.openTime,
                            },
                        }}>

                            <Scr key={findScr?.code}>
                                <h1>{findScr?.name}</h1> <br />
                                <h2>??????: {findScr?.inventory} L</h2>
                                <hr />
                                ??????: {findScr?.addr} <br />
                                ??????: {findScr?.price}??? <br />
                                ????????????: {findScr?.tel} <br />
                                <hr />
                                ?????? ????????????: {findScr?.regDt}
                                <br />
                            </Scr>
                        </Link>
                    </ScrList>
                </>
            )}
        </Container>
    );
}

export default ScrMain;