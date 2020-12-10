import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootReducersType} from "./store";



/*---типизация экшена для удаления таски---*/
export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}

/*---типизация экшена для добавления таски---*/
export type AddTaskActionType = {
    type: "ADD-TASK"
    task: TaskType
}

/*---типизация экшена для изменения названия таски---*/
export type UpdateTaskActionType = {
    type: "UPDATE-TASK"
    todolistId: string
    id: string
    model: UpdateDomainTaskModelType
}

/*---типизация экшена для удаления таски---*/
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    taskId: string
    isDone: boolean
}

/*---типизация экшена для добавления тасок */
export type SetTasksActionType = {
    type: "SET-TASKS"
    tasks: TaskType[]
    todolistId: string
}

/*---типизация объекта таски отправляемой в качестве 'payload' на сервер---*/
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

/*---типизация экшена удаления таски---*/
type ActionsType = RemoveTaskActionType | AddTaskActionType | UpdateTaskActionType |
    ChangeTaskStatusActionType | AddTodolistActionType | RemoveTodolistActionType |
    SetTasksActionType | SetTodolistsActionType;

/*---иницилизационный стейт используемый в качестве значения по умолчанию---*/
const initialState: TasksStateType = {}



export const taskReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case "REMOVE-TASK": {
            /*---делаем копию стейта---*/
            const stateCopy = {...state}
            /*---берём набор(массив) тасок у конкретного тудулиста по айди, который получаем из экшена---*/
            const tasks = stateCopy[action.todolistId];
            /*---фильтруем полученные таски, сравнивая айди из экшена с айди таски в тудулисте,
            в результирующий массив проходят только те таски, которые не совпали с айди из экшена---*/
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            /*---перезаписываем начальный набор тасок на отфильтрованные---*/
            stateCopy[action.todolistId] = newTasks;

            /*---возвращаем копию нашего стейта---*/
            return stateCopy;
        }

        case "ADD-TASK": {
            /*---делаем копию стейта---*/
            const stateCopy = {...state};
            /*---получаем все таски конкретного тудулиста---*/
            const tasks = stateCopy[action.task.todoListId];
            /*---добавляем к полученным таскам(tasks) новую таску---*/
            const newTasks = [action.task, ...tasks];
            /*---присваиваем старому списку тасок, новое значение, с уже добавленной новой таской---*/
            stateCopy[action.task.todoListId] = newTasks;

            /*---возвращаем копию нашего стейта---*/
            return stateCopy;
        }

        case "UPDATE-TASK": {
            /*---делаем копию стейта---*/
            let stateCopy = {...state};
            /*---берём конкретный тудулист---*/
            let updateTask = stateCopy[action.todolistId];
            /*---проходимся по массиву тасок, находим нужную и возвращаем новый массив,
            с измененным значением названия таски, которое пришло к нам в экшене---*/
            stateCopy[action.todolistId] = updateTask.map( t => t.id === action.id ? {...t, ...action.model} : t );

            /*---возвращаем копию нашего стейта---*/
            return stateCopy;
        }


        case "ADD-TODOLIST": {
            /*---делаем копию стейта---*/
            const stateCopy = {...state};
            /*---при создании нового тудулиста, нам должен вернуться пустой массив тасок, так как их изначально в нём нет---*/
            stateCopy[action.todolist.id] = [];

            /*---возвращаем копию нашего стейта---*/
            return stateCopy;
        }

        case "REMOVE-TODOLIST": {
            /*---делаем копию стейта---*/
            const stateCopy = {...state};
            /*---удаляем весь массив тасок---*/
            delete stateCopy[action.id];

            /*---возвращаем копию нашего стейта---*/
            return stateCopy;
        }

        case "SET-TODOLISTS": {
            /*---делаем копию стейта---*/
            const stateCopy = {...state};
            /*---проходимся по тудулистам, и конкретно взятому тудулисту присваиваем пустой массив для тасок---*/
            action.todolists.forEach(tl => stateCopy[tl.id] = [])

            /*---возвращаем копию нашего стейта---*/
            return stateCopy;
        }

        case "SET-TASKS": {
            /*---делаем копию стейта---*/
            const stateCopy = {...state};
            /*---присваиваем конкретно взятому тудулисту список тасок---*/
            stateCopy[action.todolistId] = action.tasks;

            /*---возвращаем копию нашего стейта---*/
            return stateCopy;
        }

        default:
            /*---возвращаем начальное значение нашего стейта, если не один из экшенов не отработал---*/
            return {...state};
    }
}




/*---экшн крейтор, который создает экшн для удаления таски---*/
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId: todolistId, taskId: taskId}
}

/*---экшн крейтор, который создает экшн для добавления таски---*/
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", task: task}
}

/*---экшн крейтор, который создает экшн для изменения названия конкретной таски в конкретном тудулисте таски---*/
export const updateTaskAC = (id: string, todolistId: string, model: UpdateDomainTaskModelType): UpdateTaskActionType => {
    return {type: "UPDATE-TASK", todolistId: todolistId, model: model, id: id}
}

/*---экшн крейтор, который создает экшн для изменения "checkbox-status" конкретной таски в конкретном тудулисте таски---*/
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", todolistId: todolistId, taskId: taskId, isDone: isDone}
}

/*---экшн крейтор, который запрашивает с сервера массив тасок и сохраняет их конкретный тудулист---*/
export const setTasksAC = (todolistId: string, tasks: TaskType[]): SetTasksActionType => {
    return {type: "SET-TASKS", todolistId: todolistId, tasks: tasks}
}



/*---Санка с запросом за списком тасок на сервера и диспатчащая экшнкрейтор по их добавлению в стейт---*/
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((response) => {
            dispatch(setTasksAC(todolistId, response.data.items))
        })
}

/*---Санка с запросом на удаление конкретной таски по айди в конкретном тудулисте по айди---*/
export const deleteTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, id)
        .then((response) => {
            dispatch(removeTaskAC(todolistId, id))
        })
}

/*---Санка с запросом на создание таски с заголовком в конктреном тудулисте и диспатчащая экшнкрейтор, в который приходит
новая таска с этим заголовком и другими данными о таске---*/
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then((response) => {
            dispatch(addTaskAC(response.data.data.item))
        })
}

/*---Санка с запросом на изменение данных таски в конкретном тудулисте---*/
export const updateTaskTC = (todolistId: string, id: string, model: UpdateDomainTaskModelType)  => {
    return (dispatch: Dispatch, getState: () => AppRootReducersType) => {
        /*---с помощью "getState()" обращаемся к списку тасок конкретного тудулиста из приложения, проходимся по таскам,
        если не находим эту таску в списке, то "выкидываем" ошибку и выходим из санки ничего не делая---*/
        const task = getState().tasks[todolistId].find(t => t.id === id);
        if (!task) {
            console.warn('Task not found in the state..');
            return;
        }

        /*        const apiModel: UpdateTaskModelType = {
                    title: task.title,
                    status: task.status,
                    deadline: task.deadline,
                    startDate: task.startDate,
                    priority: task.priority,
                    description: task.description,
                    ...model
                }

                const apiModel: UpdateTaskModelType = {
                    ...task,
                    ...model
                }*/
        todolistsAPI.updateTask(todolistId, id, {...task, ...model})
            .then((response) => {
                dispatch(updateTaskAC(id, todolistId, model))
            })
    }
}