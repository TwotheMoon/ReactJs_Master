import { atom } from "recoil";

interface IToDoState {  // 이후에 추가될 보드때문에 toDoState에 한번더 타입 정의
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        to_do: ["a", "b"],
        doing: ["c", "d", "e"],
        done: ["f"],
    },
});