import React, {useCallback} from 'react';
import '../App.css';
import {FilterValuesType, TaskType} from "./../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "../EditableSpan";
import {ButtonComponent} from "../common/Button/ButtonComponent";
import {Grid} from "@material-ui/core";
import {Add, DeleteOutline} from "@material-ui/icons";
import {Task} from "./Task/Task";


type PropsType = {
    id  : string
    key : string
    tasks : Array<TaskType>
    title : string
    removeTask : (taskId : string, todolistId : string) => void
    changeFilterTodolist : (value: FilterValuesType, todolistId : string) => void
    addTask : (title : string, todoListId : string) => void
    changeTaskStatus : (id : string, isDone : boolean, todoListId : string) => void
    filter : FilterValuesType
    removeTodolist : (todoListId : string) => void
    changeTaskTitle: (taskId : string, title : string, todoListId : string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}


const Todolist = React.memo( (props : PropsType) => {

//удаление тудулиста и тасок
    const removeTodolist = useCallback ( () =>  {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id]);

//добавление таски
    const addItem = useCallback ( (title: string) => {
        props.addTask(title, props.id)
    }, [props.id, props.addTask]);

//изменение названия тудулиста
    const changeTodolistTitle = useCallback ( (value: string) => {
        props.changeTodolistTitle(props.id, value);
    }, [props.id, props.changeTodolistTitle]);

//изменение фильтрации тасок
    const onAllClickHandler = useCallback ( () => {props.changeFilterTodolist('all', props.id)}, [props.changeFilterTodolist, props.id]);
    const onActiveClickHandler = useCallback ( () => {props.changeFilterTodolist('active', props.id)}, [props.changeFilterTodolist, props.id]);
    const onCompletedClickHandler = useCallback ( () => {props.changeFilterTodolist('completed', props.id)}, [props.changeFilterTodolist, props.id]);




    return <div>
        <Grid container justify='center'>
            <h2 style={ {display: "flex", alignItems: "center"} }>
                <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <ButtonComponent  onClick={removeTodolist} icon={ <DeleteOutline /> } />
            </h2>
        </Grid>
        <AddItemForm size={'small'} addItem={addItem} icon={ <Add fontSize={"small"} /> } />


        <div>
            {
                props.tasks.map(t => {
                    return <Task key={t.id} id={props.id}
                                 changeTaskTitle={props.changeTaskTitle}
                                 changeTaskStatus={props.changeTaskStatus}
                                 removeTask={props.removeTask}
                                 tasks={t}/>
                })
            }
        </div>


        <div>
            <ButtonComponent size={'small'} color={'default'} variant={props.filter === 'all' ? 'contained' : 'text'}
                             onClick={onAllClickHandler} text={'All'}/>
            <ButtonComponent size={'small'} color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                             onClick={onActiveClickHandler} text={'Active'}/>
            <ButtonComponent size={'small'} color={'secondary'}
                             variant={props.filter === 'completed' ? 'contained' : 'text'}
                             onClick={onCompletedClickHandler} text={'Completed'}/>
        </div>
    </div>
} );








export default Todolist;
