import { atom } from "recoil";

// toDos[] 데이터 타입 정의
export interface IToDo {
    text: string,
    id: number,
    category: "TO_DO" | "DOING" | "DONE",  // 모든 string 타입이 아닌 세가지 타입중 하나
}

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});