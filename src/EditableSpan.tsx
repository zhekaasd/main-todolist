import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type PropsType = {
    value : string
    // addItemNew: (newMaps: string) => void
    // onChange: (title : string) => void
    onChange: (newValue : string) => void
    size?: "small" | "medium"
}

export const EditableSpan = React.memo( (props: PropsType) => {

    /*---локальный стейт переключения между спаном и инпутом---*/
    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.value);

    /*---активация режима редактирования имени таски---*/
    let activatedEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }

    /*---выход из режима редактирования имени таски без изменения значения---*/
    let deActivatedEditMode = () => {
        setEditMode(false);
        setTitle(props.value);
    }

    /*---считывание значения из инпута---*/
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    /*---изменение значения такски по нажатию клавиш "ctrl+enter"---*/
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13) {
            setEditMode(false);
            props.onChange(title);
            // props.addCsData(title, props.id);
            // setTitle('');
        }
    }
//изменение значения такси по двойному клику
    let onChangeTaskDoubleClick = () => {
        setEditMode(false);
        props.onChange(title);
    }



    return (editMode) ?
        <TextField autoFocus
                   value={title}
                   onDoubleClick={onChangeTaskDoubleClick}
                   onBlur={deActivatedEditMode}
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressHandler}
                   size={props.size}
        />
        : <span onDoubleClick={activatedEditMode}>{props.value}</span>
} );
