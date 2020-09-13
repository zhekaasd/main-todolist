import React from "react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";

export default {
    title: "Task Component",
    component: Task
}

const removeTask = action('Remove is called');
const changeTaskStatus = action('Changed task status is called');
const changeTaskTitle = action('Change task title is called');

export const TaskComponentBaseExample = () => {
    return <div>
        <Task id={'todolistId1'} tasks={{id: '1', title: 'asd', isDone: false}} removeTask={removeTask}
              changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
        <Task id={'todolistId2'} tasks={{id: '2', title: 'qwe', isDone: true}} removeTask={removeTask}
              changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
    </div>
}