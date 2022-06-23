import React from "react";
import {Alert} from "react-bootstrap";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager, Notifications} from 'react-notifications';




const createNotification = (type, message) => {
    console.log('type----', type, 'message---',message)
    return () => {
        switch (type) {
            case 'info':
                Notifications.info({message});
                break;
            case 'success':
                Notifications.success({message}, 'Title here');
                break;
            case 'warning':
                Notifications.warning({message}, 'Close after 3000ms', 3000);
                break;
            case 'danger':
                Notifications.error({message}, 'Click me!', 5000, () => {
                    alert('callback');
                });
                break;
            default:
        }
    };
};


function Message({variant, children}) {
    console.log('variant', variant, 'children---', children)
    return (<NotificationContainer>
            {createNotification(variant, children)}
        </NotificationContainer>
    )

}

export default Message