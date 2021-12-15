import { atom, selector } from "recoil";

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

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        return [
            toDos.filter((toDo) => toDo.category === "TO_DO"),
            toDos.filter((toDo) => toDo.category === "DOING"),
            toDos.filter((toDo) => toDo.category === "DONE"),
        ];   // 새 배열에 카테고리별로 나눠서 다시 생성
    },
});