import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

// ToDoList 에서 넘겨주는 모든 버튼의  text, category, id 인자로 받음
function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;

        // 원하는 todo의 경로 확인
        // 1. 현재 화면에 뿌려지는 ToDos를 인자로 받아오기
        // 2. 그 안에서 수정하기 원하는 버튼의 id로 비교 해서 index값 획득
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const oldToDo = oldToDos[targetIndex]       // 바꿀 버튼 인덱스 기존배열에서[찾은 인덱스 번호]
            const newToDo = { text, id, category: name as any };  // 새로 세팅 name 을 category와 같은 문자열로 했기에 값을 name올 설정
            console.log(oldToDo, newToDo);         // newToDo 타입이 string이여서 오류 발생 as any로 일시적 회피
            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
        });
    };

    return (
        <li>
            <span>{text}</span>
            {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
            {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
            {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}

        </li >
    );
}

export default ToDo;