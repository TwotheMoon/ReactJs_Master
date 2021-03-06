import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Banner = styled.div < { bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
    background-size: cover;
    `;

const SignUpWrap = styled.div`
    width: 300px;
    height: 300px;
`;

const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4{
        font-family: "GmarketSansMedium";
        font-weight: bold;
    }
    span{
        font-family: "GmarketSansLight";
        font-weight: bold;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.5);
        &:hover{
            text-decoration: underline;
        }
        cursor: pointer;
    }
`;

const InputWrap = styled.div`
    margin-top: 15px;
    input::placeholder{
        font-family: GmarketSansLight;
        font-weight: bold;
    }
    input:focus{
        outline: none;
    }
    input:first-child{
        width: 100%;
        height: 45px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-left: 10px;
    }
    input:nth-child(2){
        width: 100%;
        height: 45px;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-left: 10px;
    }
    input:last-child{
        width: 100%;
        height: 45px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border: none;
        padding-left: 10px
    }
`;

const CheckBoxWrap = styled.div`
    font-size: 11px;
    margin-top: 15px;
    color: rgba(255, 255, 255, 0.5);
    hr{
        opacity: 0.3;
}
    label{
        cursor: pointer;
    }
`;

const SignUpBtn = styled.button`
    width: 100%;
    height: 50px;
    margin-top: 15px;
    background-color: rgba(255, 4, 88, 0.5);
    border: none;
    border-radius: 40px;
    color: white;
    font-family: "GmarketSansMedium";
    font-weight: bold;
    cursor: pointer;
    `;


function SignUp() {
    const { data } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [allChecked, setAllChecked] = useState(false);
    const onAllCheck = () => {
        setAllChecked((prev) => !prev);
    }

    return (
        <Banner bgPhoto={makeImagePath(data?.results[1].backdrop_path || "")} >
            <SignUpWrap>
                <TitleWrap>
                    <h4>????????????</h4>
                </TitleWrap>
                <InputWrap>
                    <input placeholder="?????? (2??? ??????)"></input>
                    <input placeholder="????????? (example@gmail.com)"></input>
                    <input placeholder="??????, ??????, ?????? ??? 2??? ?????? 10?????????"></input>
                </InputWrap>
                <CheckBoxWrap>
                    <input onClick={onAllCheck} type="checkbox" id="allChk" />
                    <label htmlFor="allChk"> ?????? ????????? ???????????????. </label>
                    <hr />
                    {allChecked ?
                        <>
                            <input type="checkbox" id="1stChk" checked={allChecked} />
                            <label htmlFor="1stChk"> ??? 14??? ???????????????. </label> <br />
                            <input type="checkbox" id="2ndChk" checked={allChecked} />
                            <label htmlFor="2ndChk"> ????????? ??????????????? ???????????????(??????) </label><br />
                            <input type="checkbox" id="3rdChk" checked={allChecked} />
                            <label htmlFor="3rdChk"> ???????????? ?????? ??? ????????? ?????? ????????? ???????????????(??????) </label><br />
                            <input type="checkbox" id="4thChk" checked={allChecked} />
                            <label htmlFor="4thChk"> ?????? ?????? ????????? ?????? ????????? ???????????????(??????) </label><br />
                        </>
                        :
                        <>
                            <input type="checkbox" id="1stChk" />
                            <label htmlFor="1stChk"> ??? 14??? ???????????????. </label> <br />
                            <input type="checkbox" id="2ndChk" />
                            <label htmlFor="2ndChk"> ????????? ??????????????? ???????????????(??????) </label><br />
                            <input type="checkbox" id="3rdChk" />
                            <label htmlFor="3rdChk"> ???????????? ?????? ??? ????????? ?????? ????????? ???????????????(??????) </label><br />
                            <input type="checkbox" id="4thChk" />
                            <label htmlFor="4thChk"> ?????? ?????? ????????? ?????? ????????? ???????????????(??????) </label><br />
                        </>
                    }
                </CheckBoxWrap>
                <Link to="/signIn">
                    <SignUpBtn>?????? ????????????</SignUpBtn>
                </Link>
            </SignUpWrap>
        </Banner >
    );
}

export default SignUp;

