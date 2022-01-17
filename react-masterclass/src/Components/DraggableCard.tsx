import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 5px 10px;
    background-color: ${(props) => props.theme.cardColor};
    `;

interface IDragabbleCardProps {
    toDo: string;
    index: number;
}

function DraggableCard({ toDo, index }: IDragabbleCardProps) {
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(magic) => (
                <Card
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
                    {toDo}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableCard); // prop이 변하지 않았다면 렌더 금지