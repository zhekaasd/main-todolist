import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType |
    AddTodolistActionType |
    RemoveTodolistActionType
    ;

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    todolistId: string
    title: string
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskId: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    taskId: string
    isDone: boolean
}



const initialState: TasksStateType = {}



export const taskReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case "REMOVE-TASK": {
            debugger
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;

            return stateCopy;
        }

        case "ADD-TASK": {
            const stateCopy = {...state};
            const newTask = {id: v1(), title: action.title, isDone: false};
            stateCopy[action.todolistId] = [newTask, ...stateCopy[action.todolistId]];

            return stateCopy;
        }

        case "CHANGE-TASK-TITLE": {
            let stateCopy = {...state};
            let changeStatus = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = changeStatus.map( t => t.id === action.taskId ? {...t, title: action.title} : t );

            return stateCopy;
        }

        case "CHANGE-TASK-STATUS": {
            let stateCopy = {...state};
            let changeStatus = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = changeStatus.map( t => t.id === action.taskId ? {...t, isDone: action.isDone} : t );

            return stateCopy;
        }

        case "ADD-TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];

            return stateCopy;
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id];

            return stateCopy;
        }

        default:
            return {...state};
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId: todolistId, taskId: taskId}
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: "ADD-TASK", todolistId: todolistId, title: title}
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", todolistId: todolistId, taskId: taskId, title: title}
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", todolistId: todolistId, taskId: taskId, isDone: isDone}
}


