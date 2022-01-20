import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";


const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { borderRadius: "100px", scale: 1 },
  drag: { backgroundColor: "rgb(46, 204, 113)", transition: { duration: 10 } },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null)
  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin              // 드래그후 초기 위치로 이동
          dragElastic={1}               // 탄성(1 일경우 마우스 위치에 따라 이동)
          dragConstraints={biggerBoxRef}
          variants={boxVariants}
          whileHover="hover"
          whileDrag="drag"
          whileTap="click" />
      </BiggerBox>
    </Wrapper>
  );
}

export default App;
