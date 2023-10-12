import React from 'react'
import '../../assets/styles/userForm.css'
import { Link } from 'react-router-dom';

export const LoginUserForm = ({
    user,
    password,
    handleSubmit
}) => {
  return (
    <main className="main" id='mainLogin'>
      <div className="form-login">
        <div className="logo"></div>
        <form id="loginForm" method="POST" onSubmit={handleSubmit}>
        <input
            type="text"
            name="user"
            placeholder='User'
            value={user}
          />
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={password}
          />
          <button id="loginButton" type="submit">
            Login
          </button>
        </form>
        <div className="horizontal-line"></div>
        <div className="foot">
          <a className='custom-link'>¿Se te olvidó la contraseña?</a>
          <Link to="/register" className="custom-link">¿No tienes cuenta?</Link>
        </div>
      </div>
    </main>
  )
}
