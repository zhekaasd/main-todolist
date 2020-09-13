import React, {ChangeEvent} from "react";
import {Checkbox} from "@material-ui/core";
import {EditableSpan} from "../../EditableSpan";
import {ButtonComponent} from "../../common/Button/ButtonComponent";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../../App";

type TaskPropsType = {
    id: string
    tasks: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

//удаление таски
    const onRemoveHandler = () => {
        props.removeTask(props.tasks.id, props.id)
    };
//изменение значения checkbox (true \ false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.tasks.id, e.currentTarget.checked, props.id)
    };
// изменение имени таски
    const onChangeTitleHandler = (title: string) => {
        props.changeTaskTitle(props.tasks.id, title, props.id)
    };


    return (
        <div>
            <li key={props.tasks.id} className={props.tasks.isDone ? 'done' : ''}>
                <Checkbox checked={props.tasks.isDone}
                          onChange={onChangeHandler}
                          size={"small"}
                />

                <EditableSpan value={props.tasks.title} onChange={onChangeTitleHandler} size={'small'}/>
                <ButtonComponent onClick={onRemoveHandler} icon={<Delete/>}/>
            </li>
        </div>
    )
});