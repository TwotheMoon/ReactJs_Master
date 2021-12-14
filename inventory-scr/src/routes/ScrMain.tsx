import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
}

function ScrMain() {
    const [loading, setLoading] = useState(true);
    const [scr, setScr] = useState<IScr[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.odcloud.kr/api/uws/v1/inventory?page=1&perPage=500&serviceKey=iVajbcB%2B7uBB9PieYeyeSvBXJElGL%2B2QZTU1nVnPjt7YvwDQcbIl7nNUIygDzGNAMXdO8nwl8%2BjlxgKtDmmTNQ%3D%3D");
            const json = await response.json();
            setScr(json.data);
            setLoading(false);
        })();
    }, [])

    // 카카오맵 API
    const { kakao } = window;

    function KakaoMapScript() {
        const container = document.getElementById('myMap');

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
                for (let i = 0; i < scr.length; i++) {
                    let latlng = new kakao.maps.LatLng(scr[i].lat, scr[i].lng);
                    let infoText = `${scr[i].name} 재고: ${scr[i].inventory}L`;

                    let imageSize = new kakao.maps.Size(24, 35);
                    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                    let markers = new kakao.maps.Marker({
                        map: map,
                        position: latlng,
                        title: scr[i].name + scr[i].inventory + "L",
                        text: scr[i].name + scr[i].inventory + "L",
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
        }
    };
    useEffect(() => {
        KakaoMapScript();
    }, [KakaoMapScript]);


    return (
        <Container>
            <Header>
                <Title> 요소수 재고 현황{loading ? "(Loading...)" : `(${scr.length})`} </Title>
            </Header>
            <MapContainer>
            <div id='myMap' style={{
                width: '480px',
                height: '600px'
            }}>
            </div>
            </MapContainer>
            <br />

            <form>
                <select>
                    <option>이름</option>
                    <option>주소</option>
                    <option>재고</option>
                </select>
                <input placeholder="검색어 입력"></input>
            </form>

            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <ScrList>
                    {scr?.map((scr) => (
                        <Link to={{
                            pathname: `/${scr.code}`,
                            state: { name: scr.name },
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