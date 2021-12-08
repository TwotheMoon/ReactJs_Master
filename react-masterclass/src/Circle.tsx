import { useState } from "react";
import styled from "styled-components";


interface ContainerProps {
    bgColor: string;
    borderColor: string;
}
// 컨테이너에 대한 데이터 타입 지정
const Container = styled.div<ContainerProps>`
        width: 200px;
        height: 200px;
        background-color: ${(props) => props.bgColor};
        border-radius: 100px;
        border: 1px solid ${(props) => props.borderColor};
    `;

interface CircleProps {
    bgColor: string;             // required 무조건 사용
    borderColor?: string;        // 조건부 사용 사용하지 X 도 됨
    //borderColor?: string | undefined;    ? = 값이 있으면 또는 없으면
    text?: string;
}

// App.tsx 에서 보내온 변수: 에 대한 데이터 타입 지정
function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
    const [counter, setCounter] = useState(1);
    const countUp = () => {
        setCounter((count) => count + 1);
        //setCounter("String") 타입스크립트가 걸러줌
    }

    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>{text}
        <div>
            <div>{counter}</div>
            <button onClick={countUp}>click</button>
        </div>
    </Container>
    // borderColor 값이 있으면 또는 없으면 bgColor 사용해라
}

export default Circle;