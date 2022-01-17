import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;


const Card = styled.div`
 border-radius: 5px;
 margin-bottom: 5px;
 padding: 5px 10px;
 background-color: ${(props) => props.theme.cardColor};
 `;

function App() {
  const [toDos, setTodos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => { // 드래그가 끝났을때 실행되는 함수
    if (!destination) return; // 제자리에 드래그 했을 경우

    setTodos((oldToDos) => {
      const copyToDos = [...oldToDos];
      // 1. source.index 에 해당하는 아이템 제거
      copyToDos.splice(source.index, 1);
      // 2. 지운 아이템 다시 destination.index로 돌려두기
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    })
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) =>
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => <Draggable key={toDo} draggableId={toDo} index={index}>
                  {(magic) => <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                    {toDo}
                  </Card>}
                </Draggable>
                )}
                {magic.placeholder}
              </Board>}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
