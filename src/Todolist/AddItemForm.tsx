import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css';
import style from "./AddItemFrom.module.css";
import cn from "classnames";
import {TextField} from "@material-ui/core";
import {ButtonComponent} from "../common/Button/ButtonComponent";

type PropsType = {
    addItem: (title: string) => void
    size?: "small" | "medium"
    icon?: React.ReactNode;
}

export const AddItemForm = React.memo((props: PropsType) => {

    /*---title - локальный стейт для считывания данных из инпута---*/
    /*---error - локальный стейт для работы с ошибками ошибки---*/

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);


    /*---изменение значения в инпуте и локальный сет этого значения---*/
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newText = e.currentTarget.value;
        setTitle(newText);
        if (newText !== '') {
            setError(null);
        }
    }

    /*---добаление новых данных сочетанием клавиш "ctrl+enter"---*/
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.charCode === 13) {
            addTask();
        }
    }

    /*---добавление новых данных по клику с удалением лишних пробелов---*/
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError("Title is required");
            setTitle('');
        }
    }

    /*---применение красной обводки---*/
    let cssErrorStyle = cn({
        [style.error]: error
    })

    return (
        <div style={{display: "flex", marginBottom: '10px'}}>
            <TextField label={error ? "Error" : "Title"} variant="outlined" value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={cssErrorStyle}
                       size={props.size}
                       error={!!error}
                       helperText={error}
            />

            <ButtonComponent onClick={addTask} icon={props.icon}/>
        </div>
    )
});
