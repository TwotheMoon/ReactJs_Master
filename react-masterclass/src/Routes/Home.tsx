import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, getPopularMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import Sliders from "./Components/Sliders";

const Wrapper = styled.div`
background-color: black;
overflow-x: hidden;
overflow-y: hidden;
`;
const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Banner = styled.div < { bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
    background-size: cover;
`;
const Title = styled.h2`
    font-size: 68px;
    font-family: "GmarketSansMedium";
    font-weight: bold;
`;
const Overview = styled.p`
    font-size: 25px;
    width: 50%;
    font-family: "GmarketSansLight";
`;




function Home() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const { data: popularData } = useQuery<IGetMoviesResult>(["popualrMovies", "popular"], getPopularMovies);


    return (
        <Wrapper>{isLoading ? (
            <Loader>Loading...</Loader>
        ) : (
            <>
                <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <Title>{data?.results[0].title}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>

                <Sliders data={data} title="지금 바로 최신영화를 만나세요!" />
                <Sliders data={popularData} title="여러 사람들이 극찬한 영화!" />
            </>
        )
        }
        </Wrapper >
    );
}

export default Home;