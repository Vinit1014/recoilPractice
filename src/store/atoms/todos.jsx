import {atom, selector} from "recoil";

export const titleAtom = atom({
    key: "titleAtom",
    default: ""
})

export const descAtom = atom({
    key: "descAtom",
    default: ""
})

export const todoAtom = atom({
    key: "todoAtom",
    default: []
})

export const filterAtom = atom({
    key: "filterAtom",
    default: ""
})

export const filteredTodosSelector = selector({
    key: "filteredTodosSelector",
    get: ({get})=>{
        const todos = get(todoAtom);
        const filter = get(filterAtom);

        return todos.filter(x => x.title.includes(filter) || x.desc.includes(filter))
    }
})

