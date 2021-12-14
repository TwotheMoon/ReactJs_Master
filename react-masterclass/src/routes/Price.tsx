import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const PriceWrapper = styled.div<{isPositive? : Boolean}>`
    width: 440px;
    height: 40px;
    border-radius: 10px;
    background-color: white;
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    margin-top: 20px;
    span:nth-child(1){
        margin-left: 20px;
        font-size: 13px;
    }
    span:nth-child(2){
        margin-right: 40px;
        color: ${(props) => props.isPositive ? "lightgreen" : "red"};
    }
`;

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

interface PriceProps{
    coinId: string,
}

function checkPositive(value: number | undefined){
    if(value) {
        return value > 0;
    }
}

function Price({coinId}: PriceProps) {
    const { isLoading, data:priceData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId),
    { refetchInterval: 5000, }
);
    return (
        <div>
            {isLoading? ("Loading Price Chart..."
            ) : (
                <>
               <PriceWrapper isPositive={checkPositive(priceData?.quotes.USD.price) === true}>
                   <span>Price:</span>
                   <span>$ {priceData?.quotes.USD.price.toFixed(2)}</span>
               </PriceWrapper>
               <PriceWrapper isPositive={checkPositive(priceData?.quotes.USD.market_cap_change_24h) === true}>
                   <span>Market change 24h:</span>
                   <span>{priceData?.quotes.USD.market_cap_change_24h.toFixed(2)} %</span>
               </PriceWrapper>
               <PriceWrapper isPositive={checkPositive(priceData?.quotes.USD.percent_change_30m) === true}>
                   <span>Percent Change (30m):</span>
                   <span>{priceData?.quotes.USD.percent_change_30m.toFixed(2)} %</span>
               </PriceWrapper>
               <PriceWrapper isPositive={checkPositive(priceData?.quotes.USD.percent_change_1h) === true}>
                   <span>Percent Change (1h):</span>
                   <span>{priceData?.quotes.USD.percent_change_1h.toFixed(2)} %</span>
               </PriceWrapper>
               <PriceWrapper isPositive={checkPositive(priceData?.quotes.USD.percent_change_12h) === true}>
                   <span>Percent Change (12h):</span>
                   <span>{priceData?.quotes.USD.percent_change_12h.toFixed(2)} %</span>
               </PriceWrapper>
               <PriceWrapper isPositive={checkPositive(priceData?.quotes.USD.percent_change_24h) === true}>
                   <span>Percent Change (24h):</span>
                   <span>{priceData?.quotes.USD.percent_change_24h.toFixed(2)} %</span>
               </PriceWrapper>
               
               </>
            )}
        </div>
    );
}

export default Price;