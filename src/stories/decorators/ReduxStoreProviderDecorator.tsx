import React from "react";
import {Provider} from "react-redux";
import {AppRootReducersType, store} from "../../redux/store";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../../redux/todolists-reducer";
import {taskReducer} from "../../redux/task-reducer";
import {v1} from "uuid";



const rootReducers = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer
})

const globalInitialState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "active"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ]
    }
}

export const storyBookStore = createStore(rootReducers, globalInitialState as AppRootReducersType);

export const ReduxStoreProviderDecorator = (Story: any) => {
    return <Provider store={storyBookStore}> { Story() } </Provider>
}