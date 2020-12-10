import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@material-ui/core";
import {EditableSpan} from "../../EditableSpan";
import {ButtonComponent} from "../../common/Button/ButtonComponent";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolists-api";

type TaskPropsType = {
    id: string
    tasks: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    /*---колбек удаления таски---*/
    const onRemoveHandler = useCallback( () => {
        props.removeTask(props.tasks.id, props.id)
    }, [props.tasks.id, props.id]);

    /*---колбек изменение значения checkbox (true\false)---*/
    const onChangeHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.tasks.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.id)
    }, [props.tasks.id, props.id]);

    /*---колбек изменение имени таски---*/
    const onChangeTitleHandler = useCallback(  (title: string) => {
        props.changeTaskTitle(props.tasks.id, title, props.id)
    }, [props.tasks.id, props.id])


    return (
        <div>
            <li key={props.tasks.id} className={props.tasks.status === TaskStatuses.Completed ? 'done' : ''}>
                <Checkbox checked={props.tasks.status === TaskStatuses.Completed}
                          onChange={onChangeHandler}
                          size={"small"}
                />

                <EditableSpan value={props.tasks.title} onChange={onChangeTitleHandler} size={'small'}/>
                <ButtonComponent onClick={onRemoveHandler} icon={<Delete/>}/>
            </li>
        </div>
    )
});