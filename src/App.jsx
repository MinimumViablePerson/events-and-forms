import { useState } from 'react'
import './App.css'

const initialFormData = {
  username: '',
  password: '',
  agrees: false
}

function App () {
  const [formData, setFormData] = useState(initialFormData)

  function handleSubmit (event) {
    event.preventDefault()

    const signInDetails = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    event.target.reset()
  }

  function handleControlledSubmit (event) {
    event.preventDefault()

    console.log(formData)

    setFormData(initialFormData)
  }

  return (
    <div className='App'>
      {/*
      uncontrolled forms
      - pro: simple, more performant
      - con: less powerful, can't keep track of data in real time
      */}
      <form className='sign-in-form' onSubmit={handleSubmit}>
        <h2>Uncontrolled Form</h2>
        <label>
          Username:
          <input type='text' name='username' required minLength={5} />
        </label>

        <label>
          Password:
          <input type='password' name='password' required minLength={5} />
        </label>
        <button type='submit'>SIGN IN</button>
      </form>

      {/*
      controlled form
      - pro: real-time data, we can alert users or change the page depending on state
      - con: changing state every time something changes, less performant, harder/more code
      */}
      <form className='sign-in-form' onSubmit={handleControlledSubmit}>
        <h2>Controlled Form: Hello {formData.username}!</h2>
        <label>
          Username:
          <input
            type='text'
            name='username'
            minLength={5}
            required
            onChange={function (event) {
              const newFormData = { ...formData, username: event.target.value }
              setFormData(newFormData)
            }}
            value={formData.username}
          />
        </label>

        {formData.username.length < 5 ? (
          <p style={{ color: 'red' }}>You username is too short</p>
        ) : null}

        <label>
          Password:
          <input
            type='password'
            name='password'
            minLength={5}
            required
            onChange={function (event) {
              const newFormData = { ...formData, password: event.target.value }
              setFormData(newFormData)
            }}
            value={formData.password}
          />
        </label>

        {formData.password.length < 5 ? (
          <p style={{ color: 'red' }}>You password is too short</p>
        ) : null}

        <label>
          Agree to T&C:
          <input
            type='checkbox'
            required
            onChange={function (event) {
              const newFormData = { ...formData, agrees: event.target.checked }
              setFormData(newFormData)
            }}
            checked={formData.agrees}
          />
        </label>

        {formData.agrees ? (
          <p>Welcome to the team! 🎉</p>
        ) : (
          <p>Please agree 🙏</p>
        )}

        <button type='submit'>SIGN UP</button>
      </form>
    </div>
  )
}

export default App
