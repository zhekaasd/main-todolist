import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";



/*---типизация экшена для удаления тудулиста---*/
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

/*---типизация экшена для добавления тудулиста---*/
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}

/*---типизация экшена для изменения названия тудулиста---*/
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

/*---типизация экшена для изменения фильтрации тасок в тудулисте---*/
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

/**/
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

//типизация фильтрации таски
export type FilterValuesType = 'all' | 'active' | 'completed';
/*---типизация удаления тудулиста---*/
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

/*---типизация экшена удаления таски---*/
export type ActionsType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType;

/*---иницилизационный стейт используемый в качестве значения по умолчанию---*/
const initialState: Array<TodolistDomainType> = [];


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            /*---делаем копию стейта---*/
            let stateCopy = [...state];
            /*---фильтруем массив тудулистов и возвращаем те, которые не совпадают с айдишкой, которое приходит в экшене ---*/
            stateCopy = state.filter(t => t.id !== action.id);

            /*---возвращаем копию нашего стейта---*/
            return stateCopy;
        }

        case 'ADD-TODOLIST':
            /*---добавляем к уже имеющимся тудулистам новый тудулист(объект), название которого приходит к нам в экшене,
            а фильтр "all" добавляется по умолчанию---*/
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'};
            return [newTodolist, ...state]

        case 'CHANGE-TODOLIST-TITLE': {
            /*---делаем фильтрацию массива по айди пришедшему в экшене, и если айди совпадают,
            нам возвращается тудулист, который нужно изменить---*/
            const todolist = state.find(t => t.id === action.id);
            /*---проверяем, сущетсвует ли наш тудулист, и если существует, то мы меняем старое название на новое,
            которое пришло к нам в экшене, если тудулиста не существует, то мы возвращаем копию нашего стейта---*/
            if (todolist) {
                todolist.title = action.title;
            }

            /*---возвращаем копию нашего стейта---*/
            return [...state];
        }

        case 'CHANGE-TODOLIST-FILTER': {
            /*---делаем фильтрацию массива по айди пришедшему в экшене, и если айди совпадают,
            нам возвращается тудулист, который нужно изменить---*/
            const todolist = state.find(t => t.id === action.id);
            /*---проверяем, сущетсвует ли наш тудулист, и если существует, то мы меняем значение старого фильтра на новое,
            которое пришло к нам в экшене, если тудулиста не существует, то мы возвращаем копию нашего стейта---*/
            if (todolist) {
                todolist.filter = action.filter;
            }

            /*---возвращаем копию нашего стейта---*/
            return [...state];
        }

        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {...tl, filter: "all"}
            })
        }

        /*---возвращаем начальное значение нашего стейта, если не один из экшенов не отработал---*/
        default:
            return state;
    }
}


/*---экшн крейтор, который создает экшн для удаления тудулиста---*/
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}

/*---экшн крейтор, который создает экшн для добавления тудулиста---*/
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', todolist: todolist}
}

/*---экшн крейтор, который создает экшн для изменения названия конкретного тудулиста---*/
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}

/*---экшн крейтор, который создает экшн для изменения значения фильтра конкретного тудулиста---*/
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}

/*---экшн крейтор, который сохраняет в массив запрашивает тудулисты---*/
export const setTodolist = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists: todolists}
}


/*---Санка с запросом за тудулистами на сервера и диспатчащая экшнкрейтор по их сохранению в стейт---*/
export const getTodolistTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then((response) => {
            dispatch(setTodolist(response.data))
        })
}

/*---Санка с запросом на создание тудулиста с заголовком на сервере и диспатчащая экшнкрейтор, в который приходит
новый тудулист с этим заголовком и другими данными о тудулисте---*/
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then((response) => {
            dispatch(addTodolistAC(response.data.data.item));
        })
}

/*---Санка с запросом на удаление конкретного тудулиста с сервера по айди---*/
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(id)
        .then((response) => {
            dispatch(removeTodolistAC(id));
        })
}

/*---Санка с запросом на изменение заголовка конкретного тудулиста с сервера по айди---*/
export const updateTodolistTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title)
        .then((resp => {
            dispatch(changeTodolistTitleAC(id, title));
        }))
}