import {TasksStateType} from "../App";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {taskReducer} from "./task-reducer";

test('ids should be equals', () => {
    const startTaskState: TasksStateType = {};
    const startTodolistState: Array<TodolistDomainType> = [];


    const action = addTodolistAC({id: 'todolistId3', title: 'yoyoyo', addedDate: '', order: 0});

    const endTaskState = taskReducer(startTaskState, action);
    const endTodolistState = todolistsReducer(startTodolistState, action);

    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
})