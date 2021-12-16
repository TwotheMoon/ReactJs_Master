import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchScr } from "../api";

const Container = styled.div`
    max-width: 480px;
    padding: 0px 20px;
    margin: 0 auto;
    span{
        width: 480px;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        color:white;
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
    addr: string,       //주유소 주소
    code: string,       //주유소 코드
    inventory: string,  //재고량
    lat: string,        //주유소 위도
    lng: string,        //주유소 경도
    name: string,       //주유소 이름
    openTime: string,   //영업시간
    price: string,      //요소수 가격
    regDt: string,      //업데이트 일시
    tel: string,        //주유소 전화번호
    color: string,      //잔량 수량 구간
    data: any,
}

interface IFindScr {
    addr: string,       //주유소 주소
    code: string,       //주유소 코드
    inventory: string,  //재고량
    lat: string,        //주유소 위도
    lng: string,        //주유소 경도
    name: string,       //주유소 이름
    openTime: string,   //영업시간
    price: string,      //요소수 가격
    regDt: string,      //업데이트 일시
    tel: string,        //주유소 전화번호
    color: string,      //잔량 수량 구간
}

function ScrMain() {
    const { isLoading, data } = useQuery<IScr>("allScr", fetchScr, { refetchInterval: 300000, });
    const scrData = data?.data;

    const [findScr, setFindScr] = useState<IFindScr>();


    // 카카오맵 API
    const { kakao } = window;

    function KakaoMapScript() {
        const container = document.getElementById('myMap');
        const scrData = data?.data;

        // 카카오맵, 현재위치
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
                    title: "현재 위치"
                });

                marker.setMap(map);

                // 주유소 마커 표시
                let imageSrc = "img/scrImg.png";
                for (let i = 0; i < scrData?.length; i++) {
                    let latlng = new kakao.maps.LatLng(scrData[i].lat, scrData[i].lng);

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

                    // 주유소 마커 클릭시 정보 표시
                    let infoText = `${scrData[i].name} 재고: ${scrData[i].inventory}L`;
                    let iwContent = `
                    <div style="padding:5px; width:300px;">
                    ${infoText}
                    <br>
                    <a href="https://map.kakao.com/link/map/${scrData[i].name},${scrData[i].lat},${scrData[i].lng}" style="color:blue" target="_blank">큰지도보기</a> 
                    <a href="https://map.kakao.com/link/to/${scrData[i].name},${scrData[i].lat},${scrData[i].lng}" style="color:blue" target="_blank">길찾기</a></div>'
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

    return (
        <Container>
            <Header>
                <Title>
                    <img src="img/scrImg.png"></img>
                    요소수 재고 현황{isLoading ? "(Loading...)" : `(${scrData?.length})`}
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
                    <span> *5분마다 업데이트 되며 실제 재고와 차이가 있을 수 있습니다.</span>
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
                                <h2>재고: {findScr?.inventory} L</h2>
                                <hr />
                                주소: {findScr?.addr} <br />
                                가격: {findScr?.price}원 <br />
                                전화번호: {findScr?.tel} <br />
                                <hr />
                                최근 업데이트: {findScr?.regDt}
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