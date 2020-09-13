import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {taskReducer} from "./task-reducer";

test('ids should be equals', () => {
    const startTaskState: TasksStateType = {};
    const startTodolistState: Array<TodolistType> = [];

    const action = addTodolistAC('new todolist');

    const endTaskState = taskReducer(startTaskState, action);
    const endTodolistState = todolistsReducer(startTodolistState, action);

    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
})