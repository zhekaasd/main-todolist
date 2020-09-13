import React from "react";
import {ButtonComponent} from "./ButtonComponent";
import {action} from "@storybook/addon-actions";
import {Add, Delete, DeleteOutline} from "@material-ui/icons";


export default {
    title: 'Button Component',
    component: ButtonComponent
}



export const ButtonComponentAddTodolistBaseExample = () => {
    return <ButtonComponent onClick={action('Add Todolist is called ')} icon={<Add fontSize={"large"}/>}/>
}

export const ButtonComponentAddTaskBaseExample = () => {
    return <ButtonComponent onClick={action('Add Task is called')} icon={<Add fontSize={"small"}/>}/>
}

export const ButtonComponentRemoveTodolistBaseExample = () => {
    return <ButtonComponent onClick={action('Remove Todolist is called')} icon={<DeleteOutline />}/>
}

export const ButtonComponentRemoveTaskBaseExample = () => {
    return <ButtonComponent onClick={action('Remove Task is called')} icon={<Delete />}/>
}



export const ButtonComponentFilterAllActiveBaseExample = () => {
    return <ButtonComponent onClick={action('Filter Task is called')} size={"small"} color={"default"} variant={"contained"} text={"All"} />
}

export const ButtonComponentFilterAllBaseExample = () => {
    return <ButtonComponent onClick={action('Filter Task is called')} size={"small"} color={"default"} variant={"text"} text={"All"} />
}

export const ButtonComponentFilterActiveActiveBaseExample = () => {
    return <ButtonComponent onClick={action('Filter Task is called')} size={"small"} color={"primary"} variant={"contained"} text={"Active"} />
}

export const ButtonComponentFilterActiveBaseExample = () => {
    return <ButtonComponent onClick={action('Filter Task is called')} size={"small"} color={"primary"} variant={"text"} text={"Active"} />
}

export const ButtonComponentFilterCopmletedActiveBaseExample = () => {
    return <ButtonComponent onClick={action('Filter Task is called')} size={"small"} color={"secondary"} variant={"contained"} text={"Completed"} />
}

export const ButtonComponentFilterCopmletedBaseExample = () => {
    return <ButtonComponent onClick={action('Filter Task is called')} size={"small"} color={"secondary"} variant={"text"} text={"Completed"} />
}
