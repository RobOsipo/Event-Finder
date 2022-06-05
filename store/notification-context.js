import React, {useState, useEffect} from 'react';

const NotificationContext = React.createContext({
    notification: null,
    showNotification: function(notificationData) {},
    hideNotification: function() {}
})

export const NotificationContextProvider = ({children}) => {

    const [notification, setNotification] = useState()

    const showNotificationHandler = (notificationData) => {
        setNotification(notificationData)
    }

    const hideNotificationHandler = () => {
        setNotification(null)
    }


    const context = {
        notification: notification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    useEffect(() => {
        if (notification && (notification.status === 'success' || notification.status === 'error')) {
            const timer = setTimeout(() => {
                setNotification(null)
            }, 3000)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [notification])


    return (
        <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>
    )
}

export default NotificationContext