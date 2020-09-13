import {taskReducer} from "./task-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {combineReducers, createStore} from "redux";


const rootReducers =  combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer
})

export const store = createStore(rootReducers);

export type AppRootReducersType = ReturnType<typeof rootReducers>


// @ts-ignore
window.store = store;