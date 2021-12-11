import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
        padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
   height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`

`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const ScrList = styled.ul``;

const Scr = styled.li`
    width: 600px;
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
    useEffect(() => {                                                                                    // 빈[] 이여서 한번만 실행
        (async () => {
            const response = await fetch("https://api.odcloud.kr/api/uws/v1/inventory?page=1&perPage=500&serviceKey=iVajbcB%2B7uBB9PieYeyeSvBXJElGL%2B2QZTU1nVnPjt7YvwDQcbIl7nNUIygDzGNAMXdO8nwl8%2BjlxgKtDmmTNQ%3D%3D");   // api 데이터 패치, json 파일에서 데이터 뽑아오기
            const json = await response.json();
            setScr(json.data);                     // 첨부터 100개까지만 가져오기
            setLoading(false);
            console.log(json.data);
        })();
    }, [300000]) // 5분마다 업데이트
    return (
        <Container>
            <Header>
                <Title> 요소수 재고 현황{loading ? "(Loading...)" : `(${scr.length})`} </Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <ScrList>
                    {scr?.map((scr) => (
                        <Scr key={scr.code}>
                            주소: {scr.addr} <br />
                            재고: {scr.inventory} <br />
                            주유소 이름: {scr.name} <br />
                            가격: {scr.price} <br />
                            최근 업데이트:{scr.regDt} <br />
                            전화번호: {scr.tel} <br />
                            <br />
                        </Scr>
                    ))}
                </ScrList>
            )}
        </Container>
    );
}

export default ScrMain;