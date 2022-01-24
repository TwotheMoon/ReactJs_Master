import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
background-color: black;
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
`;
const Overview = styled.p`
    font-size: 25px;
    width: 50%;
`;

const Slider = styled(motion.div)`
    position: relative;
    top: -100px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6, 1fr);
    margin-bottom: 5px;
    position: absolute;
    width: 100%;
`;
const Box = styled(motion.div) <{ bgPhoto: string }>`
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    font-size: 68px;
    &:first-child{
        transform-origin: center left;   /*{첫번째 box만 애니메이션 중심 왼쪽 중앙}*/
    }
    &:last-child{
        transform-origin: center right; /*{마지막 box만 애니메이션 중심 왼쪽 중앙}*/
    }
    cursor: pointer;
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4{
        text-align: center;
        font-size: 18px;
    }
`;

const rowVariants = {
    hidden: {
        x: window.innerWidth + 5,
    },
    visible: {
        x: 0,
    },
    exiting: {
        x: -window.innerWidth - 5,
    }
};
const BoxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.3,
            duration: 0.1,
            type: "tween",
        }
    }
};

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 0.1,
            type: "tween",
        }
    }
}

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`;

const BigMovie = styled(motion.div)`
    position: absolute;
    width: 40vw;
    height: 70vh;
    
    left: 0;
    right: 0;
    margin: 0 auto;
`;

const offset = 6;

function Home() {
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
    const { scrollY } = useViewportScroll();
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if (data) { // 만약 data가 없을때 오류 방지를 위해
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data?.results.length - 1; // 메인 영화 1개 빼고
            const maxIndex = Math.floor(totalMovies / offset) - 1; // 실수가 나올 수 도 있으니 무조건 내림 처리 (추가 1 ~ 2개 영화 안보이기)
            setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
        }
    };
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (movieId: number) => {
        history.push(`/movies/${movieId}`);
    };
    const onOverlayClick = () => history.push("/");
    return (
        <Wrapper>{isLoading ? (
            <Loader>Loading...</Loader>
        ) : (
            <>
                <Banner onClick={increaseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <Title>{data?.results[0].title}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>
                <Slider>
                    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                        <Row
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exiting"
                            transition={{ type: "tween", duration: 1 }}
                            key={index}
                        >
                            {data?.results.slice(1)
                                .slice(offset * index, offset * index + offset)
                                .map((movie) => (
                                    <Box
                                        layoutId={movie.id + ""}
                                        key={movie.id}
                                        whileHover="hover"
                                        initial="normal"
                                        variants={BoxVariants}
                                        onClick={() => onBoxClicked(movie.id)}
                                        transition={{ type: "tween" }}
                                        bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                                    ><Info variants={infoVariants} >
                                            <h4>{movie.title}</h4>
                                        </Info>
                                    </Box>
                                ))}
                        </Row>
                    </AnimatePresence>
                </Slider>
                <AnimatePresence>
                    {bigMovieMatch ?
                        <>
                            <Overlay
                                onClick={onOverlayClick}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                            <BigMovie
                                style={{ top: scrollY.get() + 100, }}
                                layoutId={bigMovieMatch.params.movieId}
                            >Hello</BigMovie>
                        </>
                        :
                        null
                    }
                </AnimatePresence>
            </>
        )}
        </Wrapper>
    );
}

export default Home;