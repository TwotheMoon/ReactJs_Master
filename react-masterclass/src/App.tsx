import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;



function App() {
  const [toDos, setTodos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => { // 드래그가 끝났을때 실행되는 함수
    if (!destination) return; // 제자리에 드래그 했을 경우

    // setTodos((oldToDos) => {
    //   const copyToDos = [...oldToDos];
    //   // 1. source.index 에 해당하는 아이템 제거
    //   copyToDos.splice(source.index, 1);
    //   // 2. 지운 아이템 다시 destination.index로 돌려두기
    //   copyToDos.splice(destination?.index, 0, draggableId);
    //   return copyToDos;
    // })
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
