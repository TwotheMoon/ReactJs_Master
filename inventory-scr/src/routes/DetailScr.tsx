import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const MapContainer = styled.div`
    max-width: 480px;
    height: 600px;
`;
const Container = styled.div`
    max-width: 480px;
    padding: 0px 20px;
    margin: 0 auto;
    color: white;
`;

interface RouteParams {
    scrCode: string;
}
interface IRouteState {
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
}

// 카카오맵 API

function DetailScr() {
    const { scrCode } = useParams<RouteParams>();
    const { state } = useLocation<IRouteState>();

    const { kakao } = window;
    function KakaoMapScript() {
        const container = document.getElementById('myMap');
        // 카카오맵, 해당 주유소 위치
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = state.lat;
                let lng = state.lng;
                if (lat === "0E-8") {
                    alert("해당 주유소는 위치정보가 등록되지 않았어요");
                };

                const options = {
                    center: new kakao.maps.LatLng(lat, lng),
                    level: 3
                }
                const map = new kakao.maps.Map(container, options);

                let markerPosition = new kakao.maps.LatLng(lat, lng);

                let marker = new kakao.maps.Marker({
                    position: markerPosition,
                    title: "현재 위치"
                });

                marker.setMap(map);
            }
            );
        }
    };
    useEffect(() => {
        KakaoMapScript();
    }, [KakaoMapScript]);

    return (
        <>
            <span>
                &larr;
            </span>
            <MapContainer>
                <div id='myMap' style={{
                    width: '480px',
                    height: '600px'
                }}>
                </div>
            </MapContainer>
            <Container>
                {state.name}
                {state.addr}
                {state.inventory}
            </Container>
        </>
    );
}

export default DetailScr;