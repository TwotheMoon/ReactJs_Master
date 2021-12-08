import styled from "styled-components";

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
`;

interface ContainerProps {
    bgColor: string;
}

// const x = (a:number, b:number) => a + b; 기본 문법 
// or
// 인터페이스를 이용한 문법 
// 인터페이스는 객체에 대한 타입을 정해주는 역할
interface CircleProps {
    bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
    return <Container bgColor={bgColor} >
        <div>{sayHello({ name: "moon", age: 12 })}</div>
    </Container>
}

export default Circle;

interface PlayerShape {
    name: string;
    age: number;
}
const sayHello = (playerObj: PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old.`;

sayHello({ name: "moon", age: 12 });