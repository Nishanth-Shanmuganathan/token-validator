import { FC, ReactNode } from "react";
import { Button } from "antd";
import './buttonComponent.scss';

interface ButtonComponentProps {
    loading?: boolean;
    className?: string;
    type?: "text" | "link" | "ghost" | "default" | "primary" | "dashed";
    htmlType?: "button" | "submit" | "reset";
    onClick?: (e?: any) => void;
    disabled?: boolean;
    children: ReactNode | string
}

const ButtonComponent: FC<ButtonComponentProps> = (props) => {

    const { className = "", children } = props;

    const buttonProps = { ...props }

    return (
        <div className="button-component__wrapper">
            <Button {...buttonProps} className={`button-component ${className}`}>
                {children}
            </Button>
        </div>
    )
}

export default ButtonComponent;
