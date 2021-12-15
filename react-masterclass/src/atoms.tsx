import { atom, selector } from "recoil";

// toDos[] 데이터 타입 정의
export interface IToDo {
    text: string,
    id: number,
    category: "TO_DO" | "DOING" | "DONE",  // 모든 string 타입이 아닌 세가지 타입중 하나
}

// 유저가 원하는 카테고리의 toDo 만 저장 하는 select state
export const categoryState = atom({
    key: "category",
    default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});