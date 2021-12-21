import { atom, selector } from "recoil";

export enum Categories { // enum 값들은 일반적으로 number 0 ,1 , 2
    "TO_DO" = "TO_DO", // 그래서 실제 스트링값으로 다시선언
    "DOING" = "DOING",
    "DONE" = "DONE",
    "DELETE" = "DELELTE",
}

// toDos[] 데이터 타입 정의
export interface IToDo {
    text: string,
    id: number,
    category: Categories,  // 모든 string 타입이 아닌 세가지 타입중 하나
}


export const toDoState = atom<IToDo[]>({ // 새로 생성되는 toDo들이 해당 스테이트로 저장
    key: "toDo",
    default: [],
});

// 유저가 원하는 카테고리의 toDo 만 저장 하는 select state
export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
});

export const toDoSelector = selector({  // todoState에 값들을 카테고리별로 변형
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});