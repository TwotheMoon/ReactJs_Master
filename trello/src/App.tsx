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
  const onDragEnd = (info: DropResult) => { // 드래그가 끝났을때 실행되는 함수
    const { destination, draggableId, source } = info;
    if (!destination) return; // 드래그 했지만 제자리라면

    if (destination?.droppableId === source.droppableId) { // 같은 보드에서 움직임
      setTodos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]; // 객체내의 수정할 보드 배열 복사본
        // 옴기려하는 to do 객체 전체
        const taskObj = boardCopy[source.index];
        // 1. source.index 에 해당하는 아이템 제거
        boardCopy.splice(source.index, 1);
        // 2. 지운 아이템 다시 destination.index로 돌려두기
        boardCopy.splice(destination?.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        };// 위에서 수정한 보드 + 기존 나머지 2개 보드 객체로 리턴
      });
    }

    if (destination.droppableId !== source.droppableId) { // 다른 보드로 움직였다면
      setTodos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; // 드래그에 의해 삭제할 요소가 담긴 보드
        const destinationBoard = [...allBoards[destination.droppableId]]; // 드래그에 의해 추가될 요소가 담긴 보드
        const taskObj = sourceBoard[source.index];
        //1. 이동 전 보드에서 요소 삭제
        sourceBoard.splice(source.index, 1);
        // 2. 이동 후 보드에서 요소 추가
        destinationBoard.splice(destination?.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        }
      });
    }

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
