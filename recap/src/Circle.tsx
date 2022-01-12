import styled from "styled-components"

interface ContainerProps {
    bgColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 50px;
`;

interface CircleProps {
    bgColor: string;
}

function Circle({ bgColor }: CircleProps) {

    return (
        <Container bgColor={bgColor} />
    );
}

export default Circle;

interface PlayerShape {
    name: string;
    age: number;
}

const player = {
    name: 'Moon',
    age: 29,
}

const sayHello = (playerObj: PlayerShape) => `Hello ${playerObj.name} old ${playerObj.age}`
console.log(sayHello(player));
