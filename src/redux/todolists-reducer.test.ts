import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid';


let todolistId1: string;
let todolistId2: string;
let todolistId3: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    todolistId3 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

    const action = {id: todolistId3, title: 'yoyoyo', filter: 'all', addedDate: '', order: 0};
    const endState = todolistsReducer(startState, addTodolistAC(action));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('yoyoyo');
});


test('correct todolist should change its name', () => {

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, 'Todolist changed'));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe('Todolist changed');
});





test('correct filter of todolist should be changed', () => {


    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'completed'));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe('completed');
});


