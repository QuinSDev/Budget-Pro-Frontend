import React from "react";
import "../../assets/styles/userForm.css";

export const RegisterUserForm = ({
  handleSubmit,
  name,
  lastName,
  email,
  password,
  password2,
  handleNameChange,
  handleLastNameChange,
  handleEmailChange,
  handlePasswordChange,
  handlePassword2Change,
  errors,
}) => {
  return (
    <main className="main">
      <div className="form-register">
        <div className="logo"></div>
        <form id="registrationForm" method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={errors.name ? 'Name' : 'Name'}
            value={name}
            onChange={handleNameChange}
            className={errors.name ? 'error' : ''}
          />
          <input
            type="text"
            name="lastName"
            placeholder={errors.lastName ? 'Last Name' : 'Last Name'}
            value={lastName}
            onChange={handleLastNameChange}
            className={errors.lastName ? 'error' : ''}
          />
          <input
            type="email"
            name="email"
            placeholder={errors.email ? 'Email' : 'Email'}
            value={email}
            onChange={handleEmailChange}
            className={errors.email ? 'error' : ''}
          />
          <input
            type="password"
            name="password"
            placeholder={errors.password ? 'Password' : 'Password'}
            value={password}
            onChange={handlePasswordChange}
            className={errors.password ? 'error' : ''}
          />
          <input
            type="password"
            name="password2"
            placeholder={errors.password2 ? 'Repeat password' : 'Repeat password'}
            value={password2}
            onChange={handlePassword2Change}
            className={errors.password2 ? 'error' : ''}
          />
          <button id="registerButton" type="submit">
            Register
          </button>
        </form>
      </div>
    </main>
  );
};
