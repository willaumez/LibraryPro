import React from 'react';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notis = (variant, message) => {
    if (variant === 'info') {
        toast.info(`${message}`)
    } else if (variant === 'success') {
        toast.success(`${message}`)
    } else if (variant === 'danger') {
        toast.error(`${message}`)
    } else {
        toast.warning(`${message}`)
    }
}


function Notification({variant, message}) {
    return (
        <div>

            {toast.dismiss()}
            {notis(variant, message)}

            <ToastContainer position="bottom-right" limit={1}/>
            {toast.clearWaitingQueue()}
        </div>
    );
}

export default Notification