import React, {useCallback, useEffect} from 'react';
import '../App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "../EditableSpan";
import {ButtonComponent} from "../common/Button/ButtonComponent";
import {Grid} from "@material-ui/core";
import {Add, DeleteOutline} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {FilterValuesType} from "../redux/todolists-reducer";
import {useDispatch} from "react-redux";
import {getTasksTC} from "../redux/task-reducer";


type PropsType = {
    id  : string
    key : string
    tasks : Array<TaskType>
    title : string
    removeTask : (taskId : string, todolistId : string) => void
    changeFilterTodolist : (value: FilterValuesType, todolistId : string) => void
    addTask : (title : string, todoListId : string) => void
    changeTaskStatus : (id: string, status: TaskStatuses, todoListId: string) => void
    filter : FilterValuesType
    removeTodolist : (todoListId : string) => void
    changeTaskTitle: (taskId : string, title : string, todoListId : string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}


const Todolist = React.memo( (props : PropsType) => {

    /*---хуком useDispatch диспатчим все экшенкрейторы и санккрейторы---*/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasksTC(props.id));
    }, [])

    /*---колбек удаление тудулиста и тасок---*/
    const removeTodolist = useCallback ( () =>  {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id]);

    /*---колбек добавление таски---*/
    const addItem = useCallback ( (title: string) => {
        props.addTask(title, props.id)
    }, [props.id, props.addTask]);

    /*---колбек изменение названия тудулиста---*/
    const changeTodolistTitle = useCallback ( (value: string) => {
        props.changeTodolistTitle(props.id, value);
    }, [props.id, props.changeTodolistTitle]);

    /*---изменение фильтрации тасок на основе фильтра и входящего id---*/
    const onAllClickHandler = useCallback ( () => {props.changeFilterTodolist('all', props.id)}, [props.changeFilterTodolist, props.id]);
    const onActiveClickHandler = useCallback ( () => {props.changeFilterTodolist('active', props.id)}, [props.changeFilterTodolist, props.id]);
    const onCompletedClickHandler = useCallback ( () => {props.changeFilterTodolist('completed', props.id)}, [props.changeFilterTodolist, props.id]);


    /*---фильтрация массива тасок конкретного тудулиста---*/

    let tasksForTodolist = props.tasks;  /*---массив всех тасок конкретного тудулиста без фильтрации(дефолтное значение: 'all')---*/

    /*---фильтрация массива тасок конкретного тудулиста со значением свойства 'filter: active', которая вернёт тудулист,
    таски которого будут иметь статус  'filter: active'---*/
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(p => p.status === TaskStatuses.New);
    }

    /*---фильтрация массива тасок конкретного тудулиста со значением свойства 'filter: completed',
    которая вернёт тудулист, таски которого будут иметь статус  'filter: completed'---*/
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(p => p.status === TaskStatuses.Completed);
    }


    return <div>
        <Grid container justify='center'>
            <h2 style={ {display: "flex", alignItems: "center"} }>
                {/*---динамическая компонента, переключение между режимом отображения и режимом редактирования названия такси\тудулиста ---*/}
                <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <ButtonComponent onClick={removeTodolist} icon={ <DeleteOutline /> } />
            </h2>
        </Grid>
        {/*---компонента поля ввода данных с кнопкой добавления---*/}
        <AddItemForm size={'small'} addItem={addItem} icon={ <Add fontSize={"small"} /> } />


        <div>
            {
                /*---проходим по массиву тасок и возвращаем для каждой такси значения---*/
                tasksForTodolist.map(t => {
                    return <Task key={t.id} id={props.id}
                                 changeTaskTitle={props.changeTaskTitle}
                                 changeTaskStatus={props.changeTaskStatus}
                                 removeTask={props.removeTask}
                                 tasks={t}/>
                })
            }
        </div>


        {/*---кнопки сортировки тасок в тудулисте---*/}
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