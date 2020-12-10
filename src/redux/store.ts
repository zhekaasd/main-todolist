import {taskReducer} from "./task-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

/*---объединяя reducer-ы с помощью combineReducers,мы задаём структуру нашего единственного объекта-состояния---*/
const rootReducers =  combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer
})

/*---непосредственно создаём store---*/
export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

/*---определить автоматически тип всего объекта состояния---*/
export type AppRootReducersType = ReturnType<typeof rootReducers>


/*---а это, чтобы можно было в консоли браузера обращаться к store в любой момент---*/
// @ts-ignore
window.store = store;