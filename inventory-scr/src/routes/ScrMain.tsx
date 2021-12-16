import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchScr } from "../api";

const Container = styled.div`
    max-width: 480px;
    padding: 0px 20px;
    margin: 0 auto;
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
`;

const SearchForm = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    select{
        background-color: inherit;
        color: white;
        margin-right: 10px;
        border-radius: 10px;
        .optionItem{
            background-color: black;
        }
    }   
    input{
        background-color: inherit;
        margin-right: 10px;
        border-radius: 10px;
        ::placeholder {
            color: white;
        };
    }
    button{
        border-radius: 10px;
        height: 25px;
    }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const ScrList = styled.ul`
    width: 480px;
`;

const Scr = styled.li`
    background-color: white;
    margin-top: 20px;
    border-radius: 15px;
    padding: 20px 20px;
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

function ScrMain() {
    const { isLoading, data } = useQuery<IScr>("allScr", fetchScr, { refetchInterval: 300000, });
    const scrData = data?.data;
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
                let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
                for (let i = 0; i < scrData?.length; i++) {
                    let latlng = new kakao.maps.LatLng(scrData[i].lat, scrData[i].lng);
                    let infoText = `${scrData[i].name} 재고: ${scrData[i].inventory}L`;

                    let imageSize = new kakao.maps.Size(24, 35);
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
                    let iwContent = `<div style="padding:5px; width:300px;">${infoText}</div>`,
                        iwRemoveable = true;

                    let infowindow = new kakao.maps.InfoWindow({
                        content: iwContent,
                        removable: iwRemoveable
                    });
                    kakao.maps.event.addListener(markers, 'click', function () {
                        infowindow.open(map, markers);

                    });
                }
            }
            );
        }   // if End
    };  // KakaoMapScript() End
    useEffect(() => {
        KakaoMapScript();
    }, [KakaoMapScript]);


    return (
        <Container>
            <Header>
                <Title> 요소수 재고 현황{isLoading ? "(Loading...)" : `(${scrData?.length})`} </Title>
            </Header>
            <MapContainer>
                <div id='myMap' style={{
                    width: '480px',
                    height: '600px'
                }}>
                </div>
            </MapContainer>
            <br />

            <SearchForm>
                <form>
                    <select>
                        <option className="optionItem">이름</option>
                        <option className="optionItem">주소</option>
                        <option className="optionItem">재고</option>
                    </select>
                    <input placeholder="검색어 입력"></input>
                    <button>찾기</button>
                </form>
            </SearchForm>


            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <ScrList>
                    {scrData?.map((scr: IScr) => (
                        <Link to={{
                            pathname: `/${scr.code}`,
                            state: {
                                name: scr.name,
                                inventory: scr.inventory,
                                addr: scr.addr,
                                price: scr.price,
                                tel: scr.tel,
                                regDt: scr.regDt,
                                lat: scr.lat,
                                lng: scr.lng,
                                openTime: scr.openTime,
                            },
                        }}>

                            <Scr key={scr.code}>
                                <h1>{scr.name}</h1> <br />
                                <h2>재고: {scr.inventory} L</h2>
                                <hr />
                                주소: {scr.addr} <br />
                                가격: {scr.price}원 <br />
                                전화번호: {scr.tel} <br />
                                <hr />
                                최근 업데이트:{scr.regDt}
                                <br />
                            </Scr>
                        </Link>
                    ))}
                </ScrList>
            )}
        </Container>
    );
}

export default ScrMain;