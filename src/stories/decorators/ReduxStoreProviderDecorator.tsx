import React from "react";
import {Provider} from "react-redux";
import {AppRootReducersType} from "../../redux/store";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../../redux/todolists-reducer";
import {taskReducer} from "../../redux/task-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";


const rootReducers = combineReducers({
    tasks: taskReducer,
    todolists: todolistsReducer
})

const globalInitialState: AppRootReducersType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        "todolistId1": [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }
};

export const storyBookStore = createStore(rootReducers, globalInitialState);

export const ReduxStoreProviderDecorator = (Story: any) => {
    return <Provider store={storyBookStore}> { Story() } </Provider>
}