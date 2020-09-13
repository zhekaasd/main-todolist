import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {act} from "react-dom/test-utils";






export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}


const initialState: Array<TodolistType> = [];


export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let stateCopy = [...state];
            stateCopy = state.filter(t => t.id !== action.id);
            return stateCopy;
        }

        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(t => t.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state];
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(t => t.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }

        default:
            return state;
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: newTodolistTitle, todolistId: v1() }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}


