import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;  
    display: flex;
    align-items: center;
    a{
        transition: color 0.2s ease-in;
        display: block;
    }
    &:hover{
        a{
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

// 코인데이터 타입 정의
interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    // {데이터 가져왔을시 실행, 가져온 데이터}
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)   //api.ts fetchCoins 함수 이용
    return (
        <Container>
            <Helmet>
                <title>
                Moon's Coin{isLoading ? "(loading)" : `(${data?.slice(0, 100).length})`}
                </title>
            </Helmet>
            <Header>
                <Title>Moon's Coin{isLoading ? "(loading)" : `(${data?.slice(0, 100).length})`}</Title>
            </Header>
            {isLoading ? (
                <Loader>Loaing...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map(coin => (
                        <Link to={{
                            pathname: `/${coin.id}`,
                            state: { name: coin.name },
                        }}>
                            <Coin key={coin.id}>
                                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr;
                            </Coin>
                        </Link >
                    ))}
                </CoinsList>
            )
            }
        </Container>
    );
}

export default Coins;