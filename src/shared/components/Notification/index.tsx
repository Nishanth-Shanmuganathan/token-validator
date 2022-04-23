import { notification, message as MobileNotification } from 'antd';
import { ArgsProps } from "antd/lib/message";

interface INotification {
    message: string;
    type: string
}

type notificationType = "success" | "error" | "warning" | "info" | "open";

const Notification = ({ message, type }: INotification) => {
    if (window.innerWidth <= 768) {
        return MobileNotification[type as notificationType]({
            content: message
        } as ArgsProps);
    }
    return notification[type as notificationType]({
        message,
    })
};

export default Notification; 