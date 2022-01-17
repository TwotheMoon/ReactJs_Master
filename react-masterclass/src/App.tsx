import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

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

const toDos = ["a", "b", "c", "d", "e", "f"];

const Card = styled.div`
 border-radius: 5px;
 margin-bottom: 5px;
 padding: 5px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const onDragEnd = () => { };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) =>
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((todo, index) => <Draggable draggableId={todo} index={index}>
                  {(magic) => <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                    {todo}
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
