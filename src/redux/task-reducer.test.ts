import {addTaskAC, removeTaskAC, taskReducer, updateTaskAC} from "./task-reducer";
import {TasksStateType} from "../App";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ]
    };
});


test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC("todolistId1", "3")


    const endState = taskReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId2"].length).toBe(3);
})

test('correct task should be added to correct array', () => {

    let action = addTaskAC({title: "hohoho", todoListId: "todolistId2",
        status: TaskStatuses.New, startDate: '',
        addedDate: '', deadline: '', description: '',
        id: '6', order: 0, priority: TaskPriorities.Low});

    const endState = taskReducer(startState, action);

    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].title).toBe('hohoho');
})


test('newTitle of specified task should be changed', () => {

    let action = updateTaskAC('3', "todolistId1", {
        title: "hohoho", status: TaskStatuses.New, startDate: '',
        deadline: '', description: '', priority: TaskPriorities.Low
    });

    const endState = taskReducer(startState, action);
    expect(endState["todolistId1"][2].title).toBe('hohoho');
})


test('status of specified task should be changed', () => {

    let action = updateTaskAC("1", "todolistId1", {
        title: "CSS", status: TaskStatuses.Draft, startDate: '',
        deadline: '', description: '', priority: TaskPriorities.Low
    });

    const endState = taskReducer(startState, action);

    expect(endState["todolistId1"][0].status).toBe( TaskStatuses.Draft);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId1"][2].status).toBe(TaskStatuses.New);
})


test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({addedDate: '', order: 0, id: 'todolistId4', title: 'dddd'});
    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2" && k !== "todolistId3");
    if (!newKey) {
        throw Error("new key should be added");
    }


    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('propertry with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId1');

    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId1']).not.toBeDefined();
})
