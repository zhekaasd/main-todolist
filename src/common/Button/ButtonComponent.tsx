import React from "react";
import {Button} from "@material-ui/core";
import {FilterValuesType} from "../../redux/todolists-reducer";

type PropsButtonType = {
    text?: string
    filter?: FilterValuesType
    onClick?: () => void
    typeButton?: "default" | "danger" | "success" | "info";
    color?: "default" | "inherit" | "primary" | "secondary" | undefined;
    variant?: "text" | "outlined" | "contained";
    size?: "small" | "medium" | "large" | undefined;
    icon?: React.ReactNode;
}


export const ButtonComponent = (props: PropsButtonType) => {



    /*    let css1 = cn({
            [style.button]: true,
            [`${style.activeFilter} ${style.info}`]: props.filter === 'all' && props.typeButton === 'info',
            [`${style.activeFilter} ${style.danger}`]: props.filter === 'active' && props.typeButton === 'danger' ,
            [`${style.activeFilter} ${style.success}`]: props.filter === 'completed' && props.typeButton === 'success'
        })

        let css = cn({
            [style.button]: true,
            [style.danger]: props.typeButton === 'danger',
            [style.info]: props.typeButton === 'info' ,
            [style.success]: props.typeButton === 'success',
        })*/



    return <Button  size={props.size} variant={props.variant} color={props.color} onClick={props.onClick}>
        {props.text}{props.icon}
    </Button>

}