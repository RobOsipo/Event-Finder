import {useRef} from 'react'
import classes from './Newsletter.module.css';

function NewsletterRegistration() {

  const emailInputRef = useRef()

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value

    const body = {
      email: enteredEmail
    }

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log('could not sign up for newsletter', err))

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
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