import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
        padding: 0px 20px;
    max-width: 600px;
    margin: 0 auto;
`;
const Header = styled.header`
   height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 30px;
    color: #7d70db;
    font-weight: bold;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const ScrList = styled.ul``;

const Scr = styled.li`
    width: 600px;
    background-color: white;
    margin-top: 20px;
    border-radius: 15px;
    padding: 20px 20px;
    line-height: 20px;
    h1{
        font-size: 20px;
        font-weight: bold;
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
    }, []) // 5분마다 업데이트

    // 카카오맵 API
    const { kakao } = window;
    function KakaoMapScript() {
        const container = document.getElementById('myMap');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                const options = {
                    center: new kakao.maps.LatLng(lat, lon),
                    level: 3
                }
                const map = new kakao.maps.Map(container, options);

                var markerPosition = new kakao.maps.LatLng(lat, lon);

                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    position: markerPosition
                });

                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);
            }
            );
        }
    }
    useEffect(() => {
        KakaoMapScript();
    }, []);


    return (
        <Container>
            <Header>
                <Title> 요소수 재고 현황{loading ? "(Loading...)" : `(${scr.length})`} </Title>
            </Header>

            <div id='myMap' style={{
                width: '600px',
                height: '500px'
            }}></div>

            <form>
                <select>
                    <option>재고</option>
                    <option>주소</option>
                    <option>이름</option>
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