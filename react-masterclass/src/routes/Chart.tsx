import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical { // api 데이터 타입 정의
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
interface ChartProps { // coinId 변수 데이터 타입 정의
    coinId: string;
}
function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
        { refetchInterval: 10000, }
    );
    return (
        <div>
            {isLoading ? ("Loading chart..."
            ) : (
                <ApexChart 
                type="candlestick"
                series={[
                    {
                        name: "Price",
                        data: data?.map((price) => ({
                            x: price.time_close,
                            y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)],
                        })),
                    },
                ]}
                options={{
                    theme: {
                        mode: "dark",
                    },
                    chart: {
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    },
                    xaxis: {
                        axisBorder: { show: true },
                        axisTicks: { show: true },
                        labels: { show: true },
                        type: "datetime",
                        categories: data?.map((price) => price.time_close),
                    }, 
                    yaxis:{
                        show: false,
                    },
                }}
                ></ApexChart>
            )}
        </div>
    );
}

export default Chart;