import { atom, selector } from "recoil";

export const minutesState = atom({
    key: "minutes",
    default: 0
});

export const hoursSelector = selector<number>({
    key: "hours",
    get: ({ get }) => {
        const minutes = get(minutesState);     // atom 값을 받아와서 수정 후 리턴
        return minutes / 60;
    },
    set: ({ set }, newValue) => {
        const minutes = Number(newValue) * 60; // 수정한 값을  atom 값으로 리턴
        set(minutesState, minutes);
    }
})