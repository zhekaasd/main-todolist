import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import React from "react";
import {Add} from "@material-ui/icons";


export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

const callback = action('Is called');

export const AddItemFormBaseTodolistExample = () => {
    return <AddItemForm size={"medium"} addItem={callback} icon={<Add fontSize={"large"}/>} />
}

export const AddItemFormBaseTaskExample = () => {
    return <AddItemForm size={"small"} addItem={callback} icon={<Add fontSize={"small"}/>} />
}