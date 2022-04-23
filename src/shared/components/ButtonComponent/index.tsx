import React, { FC, Fragment, ReactElement } from "react";
import { Button } from "antd";
import './buttonComponent.scss';

interface ButtonComponentProps {
    loading?: boolean;
    className?: string;
    type?: "text" | "link" | "ghost" | "default" | "primary" | "dashed";
    text?: string | ReactElement;
    htmlType?: "button" | "submit" | "reset";
    onClick?: (e?: any) => void;
    disabled?: boolean;
    iconClass?: string;
    suffix?: ReactElement
}

const ButtonComponent: FC<ButtonComponentProps> = (props) => {

    const { text, iconClass, className = "", suffix } = props;

    const buttonProps = { ...props }

    delete buttonProps['text']
    delete buttonProps['iconClass']

    return (
        <Fragment>
            <Button {...buttonProps} className={`${className} button-component ${suffix && 'with-suffix'}`}>
                {iconClass && !props.loading && <span className={iconClass + " btn-icon"} />} {text}
            </Button>
            {suffix}
        </Fragment>
    )
}

export default ButtonComponent;
