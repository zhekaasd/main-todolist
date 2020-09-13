
import {action} from "@storybook/addon-actions";
import React from "react";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}


export const EditableSpanTodolistBaseExample = () => {
    return <EditableSpan value={'Todolist name'} onChange={action('Todolist is called')} size={"medium"}/>
}

export const EditableSpanTaskBaseExample = () => {
    return <EditableSpan value={'Task name'} onChange={action('Task is called')} size={"small"} />
}

