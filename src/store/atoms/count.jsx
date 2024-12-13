import {atom, selector} from "recoil";

export const countAtom = atom({
    key: "countAtom",
    default: 0
})

export const evenSelector = selector({
    key: "evenSelector",
    get: ({get}) => {
        const count = get(countAtom); //selectors can depend on either selector or atom
        return count % 2 === 0;
    }
})

