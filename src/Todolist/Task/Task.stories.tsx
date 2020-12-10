import React from "react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

export default {
    title: "Task Component",
    component: Task
}

const removeTask = action('Remove is called');
const changeTaskStatus = action('Changed task status is called');
const changeTaskTitle = action('Change task title is called');

export const TaskComponentBaseExample = () => {
    return <div>
        <Task id={'todolistId1'} tasks={{id: '1', title: 'asd', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0,
            priority: TaskPriorities.Low, startDate: '', todoListId: "todolistId1"}} removeTask={removeTask}
              changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
        <Task id={'todolistId2'} tasks={{id: '2', title: 'asd', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0,
            priority: TaskPriorities.Low, startDate: '', todoListId: "todolistId2"}} removeTask={removeTask}
              changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
    </div>
}