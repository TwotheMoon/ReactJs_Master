import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);  // atom or selector 관련 스테이트 변경 함수
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value); // 연결 하기
    };
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <select onInput={onInput}>
                <option value={"TO_DO"}>To Do</option>
                <option value={"DOING"}>Doing</option>
                <option value={"DONE"}>Done</option>
            </select>
            <CreateToDo />
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
        </div>
    );
}

export default ToDoList;