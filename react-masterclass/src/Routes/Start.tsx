import styled from "styled-components";

const Section = styled.div` 
    width: 100%;
    height: 100%;
    background-color: linear-gradient(135deg,#e09,#d0e);
`;
const Title = styled.h1`
    margin-top: 100px;
`;

function Start() {

    return (
        <>
            <Section>
                <Title>Welcome! </Title>
            </Section>
        </>
    );
}

export default Start;