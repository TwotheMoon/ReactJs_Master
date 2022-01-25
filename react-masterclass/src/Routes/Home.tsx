import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, getSimilarMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

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
const SliderBtn = styled.button`
    width: 40px;
    height: 200px;
    z-index: 99;
    background-color: rgba(255,255,255,0.4);
    border: none;
    cursor: pointer;
    &:last-child{
        position: absolute;
        right: 0;
    }
`;
const Slider = styled(motion.div)`
    width: 100%;
    position: relative;
    top: -100px;
    display: grid;
    h1{
        position: absolute;
        top: -50px;
        left: 20px;
        font-weight: bold;
        font-size: 28px;
    }
`;
const Row = styled(motion.div)`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6, 1fr);
    margin-bottom: 5px;
    position: absolute;
    width: 100%;
    padding: 0px 50px;
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
    hidden: (back: boolean) => ({
        x: back ? -window.innerWidth - 5 : window.innerWidth + 5,
    }),
    visible: {
        x: 0,
    },
    exiting: (back: boolean) => ({
        x: back ? window.innerWidth + 5 : -window.innerWidth - 5,
    }),
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
    height: 100vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${(props) => props.theme.black.lighter};
`;
const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 400px;
`;
const BigTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    padding: 20px;
    font-size: 36px;
    position: relative;
    top: -120px;
    `;
const IconWrap = styled.div`
    padding-top: 10px;
    padding-left: 10px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    `;
const Icons = styled.div`
    width: 100%;
    display: flex;
    
`;
const IconCircle = styled(motion.div)`
    margin-left: 20px;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
        background-color: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.7);
    }
    `;
const BigInfo = styled.span`
    width: 100%;
    margin-right: 30px;
    padding-top: 10px;
    padding-left: 120px;
    font-family: "GmarketSansLight";
    font-weight: bold;
    font-size: 13px;
    span{
        font-family: "GmarketSansMedium";
        font-weight: bold;
    }
`;
const BigOverview = styled.p`
    padding: 20px;
    color: ${(props) => props.theme.white.lighter};
    top: -80px;
    position: relative;
`;
const offset = 6;
let selectMovieId = 0;
function Home() {
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
    const { scrollY } = useViewportScroll();
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const { data: simData } = useQuery<IGetMoviesResult>(["simMovies", selectMovieId], () => getSimilarMovies(selectMovieId));
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [back, setBack] = useState(false);
    const increaseIndex = () => {
        if (data) { // 만약 data가 없을때 오류 방지를 위해
            if (leaving) return;
            setBack(false);
            toggleLeaving();
            const totalMovies = data?.results.length - 1; // 메인 영화 1개 빼고
            const maxIndex = Math.floor(totalMovies / offset) - 1; // 실수가 나올 수 도 있으니 무조건 내림 처리 (추가 1 ~ 2개 영화 안보이기)
            setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
            console.log(index);
        }
    };
    const decreaseIndex = () => {
        if (data) { // 만약 data가 없을때 오류 방지를 위해
            if (leaving) return;
            setBack(true);
            toggleLeaving();
            const totalMovies = data?.results.length - 1; // 메인 영화 1개 빼고
            const maxIndex = Math.floor(totalMovies / offset) - 1; // 실수가 나올 수 도 있으니 무조건 내림 처리 (추가 1 ~ 2개 영화 안보이기)
            setIndex((prev) => prev === 0 ? maxIndex : prev - 1);
            console.log(index);
        }
    };
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (movieId: number) => {
        history.push(`/movies/${movieId}`);
        selectMovieId = movieId;
    };
    const onOverlayClick = () => history.push("/");
    const clickedMovie = bigMovieMatch?.params.movieId &&
        data?.results.find((movie) => String(movie.id) === bigMovieMatch.params.movieId);
    console.log(simData?.results.slice(1));
    return (
        <Wrapper>{isLoading ? (
            <Loader>Loading...</Loader>
        ) : (
            <>
                <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <Title>{data?.results[0].title}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>

                <Slider>
                    <h1>지금 극장에서 만나요! </h1>
                    <AnimatePresence custom={back} initial={false} onExitComplete={toggleLeaving}>
                        <SliderBtn onClick={decreaseIndex}><i className="fas fa-chevron-left fa-2x"></i></SliderBtn>
                        <Row
                            variants={rowVariants}
                            custom={back}
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
                    <SliderBtn onClick={increaseIndex}><i className="fas fa-chevron-right fa-2x"></i></SliderBtn>
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
                            >
                                {clickedMovie && <>
                                    <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }} />
                                    <IconWrap>
                                        <Icons>
                                            <IconCircle>
                                                <i className="fas fa-plus"></i>
                                            </IconCircle>
                                            <IconCircle>
                                                <i className="far fa-thumbs-up"></i>
                                            </IconCircle>
                                            <IconCircle>
                                                <i className="far fa-thumbs-down"></i>
                                            </IconCircle>
                                        </Icons>
                                        <BigInfo>
                                            <span>개봉일:</span> {clickedMovie.release_date} <br />
                                            <span>평점:</span> {clickedMovie.vote_average}
                                        </BigInfo>
                                    </IconWrap>
                                    <BigTitle>{clickedMovie.title}</BigTitle>
                                    <BigOverview>{clickedMovie.overview}</BigOverview>
                                </>}
                            </BigMovie>
                        </>
                        :
                        null
                    }
                </AnimatePresence>
            </>
        )
        }
        </Wrapper >
    );
}

export default Home;