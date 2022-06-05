import {useRef, useContext} from 'react'
import NotificationContext from '../../store/notification-context'
import classes from './Newsletter.module.css';

function NewsletterRegistration() {

  const notificationCtx = useContext(NotificationContext)

  const emailInputRef = useRef()

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value

    const body = {
      email: enteredEmail
    }

    notificationCtx.showNotification({
      title: 'Signing Up....',
      message: 'Registering For Newsletter',
      status: 'pending'
    })

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.ok) {
        return response.json()
      }

      response.json().then(data => {
        throw new Error(data.message || '!response.ok')
      })
    })
    .then(data => {
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Successfully Registered For Newsletter',
        status: 'success'
      })
    })
    .catch(err => {
      notificationCtx.showNotification({
        title: 'Error',
        message: 'There Was A Problem Registering For Newsletter',
        status: 'error'
      })
    })

  
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;