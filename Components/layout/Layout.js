import React, {useContext} from 'react'
import MainHeader from './MainHeader'
import Notification from '../ui/Notification'
import NotificationContext from '../../store/notification-context'

const layout = (props) => {
  const notificationCtx = useContext(NotificationContext)
  const activeNotification = notificationCtx.notification
  return (
    <>
        <MainHeader />
        <main>{props.children}</main>
       {activeNotification && <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />}
    </>
  )
}

export default layout