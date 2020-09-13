import React, {useCallback, useState} from 'react';
import './App.css';
import Todolist from "./Todolist/Todolist";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducersType} from "./redux/store";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from "./redux/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redux/task-reducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Add, Menu, Search} from "@material-ui/icons";
import {AddItemForm} from "./Todolist/AddItemForm";
import {ButtonComponent} from "./common/Button/ButtonComponent";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed';


function App() {

//хуком useSelector достаем из стора данные о тасках
  const tasks = useSelector<AppRootReducersType, TasksStateType>(state => state.tasks);
//хуком useSelector достаем из стора данные о тудулистах
  const todolists = useSelector<AppRootReducersType, Array<TodolistType>>(state => state.todolists);
  const dispatch = useDispatch();


// удаление таски
  const removeTask = useCallback((id: string, todoListId: string) => {
    const action = removeTaskAC(todoListId, id);
    dispatch(action);
  }, [dispatch]);

// добавление новой таски
  const addTask = useCallback((title: string, todoListId: string) => {
    const action = addTaskAC(todoListId, title);
    dispatch(action);
  }, [dispatch]);

// изменение названия таски
  const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
    dispatch(changeTaskTitleAC(todoListId, taskId, title));
  }, [dispatch]);

// изменение значения checkbox'а в таске
  const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
    dispatch(changeTaskStatusAC(todoListId, taskId, isDone));
  }, [dispatch]);


// сортировка задач по типу(все, выполненные, активные)
  const changeFilterTodolist = useCallback((filter: FilterValuesType, todolistId: string) => {
    const action = changeTodolistFilterAC(todolistId, filter);
    dispatch(action);
  }, [dispatch]);

// удаление тудулиста и его тасок
  const removeTodolist = useCallback((todoListId: string) => {
    dispatch(removeTodolistAC(todoListId));
  }, [dispatch]);

// добавление нового тудулиста
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistAC(title));
  }, [dispatch]);

// изменение названия тудулиста
  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatch(action);
  }, [dispatch])


  return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <ButtonComponent color={"inherit"} icon={ <Menu  aria-label={"menu"}  /> } />
            <Typography  variant="h6">
              WTF
            </Typography>
            <ButtonComponent color={"inherit"} text={"Login"}/>
          </Toolbar>
        </AppBar>



        <Grid container justify={'center'} style={ {padding: '20px'} }>
          <AddItemForm addItem={addTodolist} icon={ <Add fontSize={"large"} /> }/>
        </Grid>


        <Container fixed>
          <Grid container spacing={3} justify='center'>
            {
              todolists.map(t => {

                    let allTodolistTasks = tasks[t.id];
                    let tasksForTodolist = allTodolistTasks;

                    //сортировка тасок по фильтру 'active'
                    if (t.filter === 'active') {
                      tasksForTodolist = allTodolistTasks.filter(p => p.isDone === false);
                    }

                    //сортировка тасок по фильтру 'completed'
                    if (t.filter === 'completed') {
                      tasksForTodolist = allTodolistTasks.filter(p => p.isDone === true);
                    }

                    return (
                        <Grid item>
                          <Paper variant={'elevation'} style={{padding: '10px'}}>
                            <Todolist
                                title={t.title}
                                filter={t.filter}
                                id={t.id}
                                key={t.id}
                                tasks={tasksForTodolist}
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
