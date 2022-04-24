import { notification, message as MobileNotification } from 'antd';
import { ArgsProps } from "antd/lib/message";
import { NotificationTypes } from '../../../enums/notificationTypes';
import "./notification.scss";

interface INotification {
    message: string;
    type: string
}

type notificationType = "success" | "error" | "warning";

const Notification = ({ message, type }: INotification) => {

    const getNoticeIcon = (type: string) => {
        switch (type) {
            case NotificationTypes.ERROR:
                return <i className='icon-close-solid' />
            case NotificationTypes.SUCCESS:
                return <i className='icon-check-circle' />
            default:
                return <i className='icon-information-solid' />
        }
    }

    if (window.innerWidth <= 768) {
        return MobileNotification[type as notificationType]({
            content: message
        } as ArgsProps);
    }
    return notification[type as notificationType]({
        message,
        closeIcon: <i className='icon-cross' />,
        icon: getNoticeIcon(type),
    })
};

export default Notification; 