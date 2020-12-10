import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from "./Todolist/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducersType} from "./redux/store";
import {
  changeTodolistFilterAC,
  createTodolistTC,
  deleteTodolistTC,
  FilterValuesType,
  getTodolistTC,
  TodolistDomainType,
  updateTodolistTC
} from "./redux/todolists-reducer";
import {createTaskTC, deleteTaskTC, updateTaskTC} from "./redux/task-reducer";
import {AppBar, Container, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import {Add, Menu} from "@material-ui/icons";
import {AddItemForm} from "./Todolist/AddItemForm";
import {ButtonComponent} from "./common/Button/ButtonComponent";
import {TaskStatuses, TaskType} from "./api/todolists-api";


/*---типизация списка тасок в конкретном тудулисте---*/
export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {

  /*---хуком useSelector достаем из стора данные о тасках---*/
  const tasks = useSelector<AppRootReducersType, TasksStateType>(state => state.tasks);
  /*---хуком useSelector достаем из стора данные о тудулистах---*/
  const todolists = useSelector<AppRootReducersType, Array<TodolistDomainType>>(state => state.todolists);
  /*---хуком useDispatch диспатчим все экшенкрейторы и санккрейторы---*/
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getTodolistTC());
  }, [])


  /*---удаление таски---*/
  /*---хук useCallback позволяет создать(запустить функцию заного), если изменятся его параметры---*/
  const removeTask = useCallback((id: string, todoListId: string) => {
    dispatch(deleteTaskTC(todoListId, id));
  }, [dispatch]);


  /*---добавление новой таски и диспатч экшена в редьюсер---*/
  const addTask = useCallback((title: string, todoListId: string) => {
    dispatch(createTaskTC(todoListId, title))
  }, [dispatch]);


  /*---изменение названия таски и диспатч экшена в редьюсер---*/
  const changeTaskTitle = useCallback((id: string, title: string, todoListId: string) => {
    dispatch(updateTaskTC(todoListId, id, {title: title}))
  }, [dispatch]);


  /*---изменение значения checkbox'а в таске и диспатч экшена в редьюсер---*/
  const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todoListId: string) => {
    dispatch(updateTaskTC(todoListId, id, {status: status}))
  }, [dispatch]);


  /*---сортировка задач по типу(все, выполненные, активные) и диспатч экшена в редьюсер---*/
  const changeFilterTodolist = useCallback((filter: FilterValuesType, todolistId: string) => {
    const action = changeTodolistFilterAC(todolistId, filter);
    dispatch(action);
  }, [dispatch]);


  /*---удаление тудулиста и его тасок и диспатч экшена в редьюсер---*/
  const removeTodolist = useCallback((todoListId: string) => {
    dispatch(deleteTodolistTC(todoListId));
  }, [dispatch]);


  /*---добавление нового тудулиста и диспатч экшена в редьюсер---*/
  const addTodolist = useCallback((title: string) => {
    dispatch(createTodolistTC(title));
  }, [dispatch]);


  /*---изменение названия тудулиста и диспатч экшена в редьюсер---*/
  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    dispatch(updateTodolistTC(id, title))
  }, [dispatch])


  return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <ButtonComponent color={"inherit"} icon={<Menu aria-label={"menu"}/>}/>
            <Typography variant="h6">
              WTF
            </Typography>
            <ButtonComponent color={"inherit"} text={"Login"}/>
          </Toolbar>
        </AppBar>


        <Grid container justify={'center'} style={{padding: '20px'}}>
          {/*компонента поля ввода данных с кнопкой добавления*/}
          <AddItemForm addItem={addTodolist} icon={<Add fontSize={"large"}/>}/>
        </Grid>


        <Container fixed>
          <Grid container spacing={3} justify='center'>
            {
              /*проходимся по массиву тудулистов, и возвращаем массив тасок на основе "id" конкретного тудулиста */
              todolists.map(t => {

                    /*массив всех тасок конкретного тудулиста без фильтрации(дефолтное значение: 'all')*/
                    let allTodolistTasks = tasks[t.id];


                    return (
                        <Grid item>
                          <Paper variant={'elevation'} style={{padding: '10px'}}>
                            <Todolist
                                title={t.title}
                                filter={t.filter}
                                id={t.id}
                                key={t.id}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilterTodolist={changeFilterTodolist}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                          </Paper>
                        </Grid>
                    )
                  }
              )}
          </Grid>
        </Container>
      </div>
  );
}


export default App;
