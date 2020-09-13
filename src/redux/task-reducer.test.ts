import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./task-reducer";
import {TasksStateType} from "../App";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {

    const startState: TasksStateType = {
        "todolistId1" : [
            {id: "1", title: 'Dust 2', isDone : true},
            {id: "2", title: 'Mirage', isDone : true},
            {id: "3", title: 'Office', isDone : false},
            {id: "4", title: 'Nuke', isDone : true},
            {id: "5", title: 'Train', isDone : false},
        ],
        "todolistId2" : [
            {id: v1(), title: 'Tuscan', isDone : true},
            {id: v1(), title: 'Cobblestone', isDone : false},
            {id: v1(), title: 'Vertigo', isDone : true},
            {id: v1(), title: 'Inferno', isDone : false},
        ],
        "todolistId3" : [
            {id: v1(), title: 'Dust', isDone : true},
            {id: v1(), title: 'Season', isDone : false},
            {id: v1(), title: 'Agency', isDone : true},
        ]
    };

    const action = removeTaskAC("todolistId1", "3")


    const endState = taskReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(4);
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        "todolistId1" : [
            {id: "1", title: 'Dust 2', isDone : true},
            {id: "2", title: 'Mirage', isDone : true},
            {id: "3", title: 'Office', isDone : false},
            {id: "4", title: 'Nuke', isDone : true},
            {id: "5", title: 'Train', isDone : false},
        ],
        "todolistId2" : [
            {id: v1(), title: 'Tuscan', isDone : true},
            {id: v1(), title: 'Cobblestone', isDone : false},
            {id: v1(), title: 'Vertigo', isDone : true},
            {id: v1(), title: 'Inferno', isDone : false},
        ],
        "todolistId3" : [
            {id: v1(), title: 'Dust', isDone : true},
            {id: v1(), title: 'Season', isDone : false},
            {id: v1(), title: 'Agency', isDone : true},
        ]
    };

    let action = addTaskAC('todolistId3', 'Hohoho');

    const endState = taskReducer(startState, action);

    expect(endState['todolistId3'].length).toBe(4);
})


test('newTitle of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1" : [
            {id: "1", title: 'Dust 2', isDone : true},
            {id: "2", title: 'Mirage', isDone : true},
            {id: "3", title: 'Office', isDone : false},
            {id: "4", title: 'Nuke', isDone : true},
            {id: "5", title: 'Train', isDone : false},
        ],
        "todolistId2" : [
            {id: v1(), title: 'Tuscan', isDone : true},
            {id: v1(), title: 'Cobblestone', isDone : false},
            {id: v1(), title: 'Vertigo', isDone : true},
            {id: v1(), title: 'Inferno', isDone : false},
        ],
        "todolistId3" : [
            {id: v1(), title: 'Dust', isDone : true},
            {id: v1(), title: 'Season', isDone : false},
            {id: v1(), title: 'Agency', isDone : true},
        ]
    };

    let action = changeTaskTitleAC("todolistId1", "4", "new title");

    const endState = taskReducer(startState, action);

    expect(endState["todolistId1"][3].title).toBe('new title');
})


test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1" : [
            {id: "1", title: 'Dust 2', isDone : true},
            {id: "2", title: 'Mirage', isDone : true},
            {id: "3", title: 'Office', isDone : false},
            {id: "4", title: 'Nuke', isDone : true},
            {id: "5", title: 'Train', isDone : false},
        ],
        "todolistId2" : [
            {id: v1(), title: 'Tuscan', isDone : true},
            {id: v1(), title: 'Cobblestone', isDone : false},
            {id: v1(), title: 'Vertigo', isDone : true},
            {id: v1(), title: 'Inferno', isDone : false},
        ],
        "todolistId3" : [
            {id: v1(), title: 'Dust', isDone : true},
            {id: v1(), title: 'Season', isDone : false},
            {id: v1(), title: 'Agency', isDone : true},
        ]
    };

    let action = changeTaskStatusAC("todolistId1", "4", false);

    const endState = taskReducer(startState, action);

    expect(endState["todolistId1"][2].isDone).toBe(false);
    expect(endState["todolistId1"][3].isDone).toBe(false);
    expect(endState["todolistId1"][4].isDone).toBe(false);
})


test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1" : [
            {id: "1", title: 'Dust 2', isDone : true},
            {id: "2", title: 'Mirage', isDone : true},
            {id: "3", title: 'Office', isDone : false},
            {id: "4", title: 'Nuke', isDone : true},
            {id: "5", title: 'Train', isDone : false},
        ],
        "todolistId2" : [
            {id: v1(), title: 'Tuscan', isDone : true},
            {id: v1(), title: 'Cobblestone', isDone : false},
            {id: v1(), title: 'Vertigo', isDone : true},
            {id: v1(), title: 'Inferno', isDone : false},
        ],
        "todolistId3" : [
            {id: v1(), title: 'Dust', isDone : true},
            {id: v1(), title: 'Season', isDone : false},
            {id: v1(), title: 'Agency', isDone : true},
        ]
    };

    const action = addTodolistAC('new todolist title');
    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2" && k !== "todolistId3");
    if (!newKey) {
        throw Error("new key should be added");
    }


    expect(keys.length).toBe(4);
    expect(endState[newKey]).toEqual([]);
})

test('propertry with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1" : [
            {id: "1", title: 'Dust 2', isDone : true},
            {id: "2", title: 'Mirage', isDone : true},
            {id: "3", title: 'Office', isDone : false},
            {id: "4", title: 'Nuke', isDone : true},
            {id: "5", title: 'Train', isDone : false},
        ],
        "todolistId2" : [
            {id: v1(), title: 'Tuscan', isDone : true},
            {id: v1(), title: 'Cobblestone', isDone : false},
            {id: v1(), title: 'Vertigo', isDone : true},
            {id: v1(), title: 'Inferno', isDone : false},
        ],
        "todolistId3" : [
            {id: v1(), title: 'Dust', isDone : true},
            {id: v1(), title: 'Season', isDone : false},
            {id: v1(), title: 'Agency', isDone : true},
        ]
    };

    const action = removeTodolistAC('todolistId1');

    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['todolistId1']).not.toBeDefined();
})
