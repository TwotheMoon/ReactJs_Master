import { atom } from "recoil";

export interface ITodo {
    id: number;
    text: string;
}

interface IToDoState {  // 이후에 추가될 보드때문에 toDoState에 한번더 타입 정의
    [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        doing: [],
        done: [],
    },
});