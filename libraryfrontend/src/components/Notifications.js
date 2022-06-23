import React from 'react';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notis = (variant, message) => {
	if (variant === 'info'){
        toast.info(`${message}`)
    }
    else if (variant === 'success'){
        toast.success(`${message}`)
    }
    else if (variant === 'danger'){
        toast.error(`${message}`)
    }
    else {
        toast.error(`${message}`)
    }
}


function Notification({variant, message}) {
    return (
        <div>{!toast.isActive() ? (
            notis(variant, message)
        ):(
            (toast.dismiss())
            (notis(variant, message))
        )}

        <ToastContainer position="bottom-right" limit={1}/>
        </div>
    );
}

export default Notification