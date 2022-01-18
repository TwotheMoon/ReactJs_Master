import { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 18px;
`;

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean
}

const Area = styled.div<IAreaProps> `
    background-color: ${(props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent")};
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
    padding: 20px;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const onClick = () => {
        inputRef.current?.focus();
        setTimeout(() => {
            inputRef.current?.blur();
        }, 5000);
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <input ref={inputRef} placeholder="grab me" />
            <button onClick={onClick}>click me</button>
            <Droppable droppableId={boardId}>
                {(magic, info) =>
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DraggableCard key={toDo} toDo={toDo} index={index} />
                        ))}
                        {magic.placeholder}
                    </Area>}
            </Droppable>
        </Wrapper>
    );
}

export default Board;