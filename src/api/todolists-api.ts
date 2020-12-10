import axios from 'axios';

/*---Настройки, разрешающие реализацию запросов на данный API сервера---*/
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'a78224e4-f36a-4973-8a7c-cd8a0ee10740'
    },
    withCredentials: true
})

/*---Типизация конкретного тудулиста---*/
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

/*---Типизация ответов сервера---*/
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

/*---Типизация статуса таски---*/
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

/*---Типизация приоритета таски---*/
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

/*---Типизация отдельно взятой таски---*/
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

/*---Типизация объекта, который отправляется на сервер, для изменения каких-либо данных таски---*/
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

/*---Типизация ответа сервера со списком тасок---*/
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}




export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists'); /*Запрос за списком тудулистов, которые имеются на сервере*/
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title}); /*Запрос на добавление нового тудулиста с отправкой на сервер "имени" тудулиста*/
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>('todo-lists/' + id); /*Запрос на тудулиста по конкретной адйишке*/
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>('todo-lists/' + id, {title: title}); /*Запрос на изменение названия тудулиста по конкретной адйишке*/
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`); /*Запрос за всем списком тасок, конкретного тудулиста*/
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle}); /*Запрос на создние новой таски, в конкретном тудулисте*/
    },
    deleteTask(todolistId: string, id: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`); /*Запрос на удление конкретной таски, в конкретно взятом тудулисте*/
    },
    updateTask(todolistId: string, id: string, model: UpdateTaskModelType) {
        return instance.put(`todo-lists/${todolistId}/tasks/${id}`, model); /*Запрос на изменение данных конкретной таски, в конкретно взятом тудулисте*/
    }
}