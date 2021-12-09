import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { json } from "stream/consumers";
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
interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, [])
    console.log(coins)
    return (
        <Container>
            <Header>
                <Title>코인{loading ? "(loading)" : `(${coins.length})`}</Title>
            </Header>
            {loading ? (
                <Loader>Loaing...</Loader>
            ) : (
                <CoinsList>
                    {coins.map(coin => (
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