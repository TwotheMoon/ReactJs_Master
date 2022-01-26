import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearchMovies, getSearchTv, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
background-color: black;
overflow-x: hidden;
overflow-y: hidden;
`;

const Wrap = styled.div`
    margin-top: 100px;
`;
const SimCover = styled.div`
    width: 100%;
    height: 500px;
    margin: 0px 10px;
    background-size: cover;
    background-position: center center;
    position: relative;
`;
const SimTitle = styled.div`
    font-family: "GmarketSansLight";
    font-weight: bold;
    position: absolute;
    bottom: 15px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    text-align: center;
`;

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const { data: movieData, isLoading } = useQuery<IGetMoviesResult>(["simMovies", keyword], () => getSearchMovies(keyword + ""));
    const { data: tvData } = useQuery<IGetMoviesResult>(["simTV", keyword], () => getSearchTv(keyword + ""));

    return (
        <Wrapper>
            {

                isLoading ? "Loding..." :
                    <>
                        <div>
                            <Wrap>
                                {movieData?.results.map((list) => {
                                    return (
                                        <SimCover
                                            key={list.id}
                                            style={{ backgroundImage: `url(${makeImagePath(list.backdrop_path)})` }}>
                                            <SimTitle>{list.title}</SimTitle>
                                        </SimCover>
                                    );
                                })}
                            </Wrap>
                        </div>
                    </>
            }
        </Wrapper>
    );
}

export default Search;