import { atom, selector } from "recoil";

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

type categories = "TO_DO" | "DOING" | "DONE";

// toDos[] 데이터 타입 정의
export interface IToDo {
    text: string,
    id: number,
    category: Categories,  // 모든 string 타입이 아닌 세가지 타입중 하나
}


export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

// 유저가 원하는 카테고리의 toDo 만 저장 하는 select state
export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});