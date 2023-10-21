import React from "react";
import "../../assets/styles/userForm.css";

/**
 * Componente funcional que muestra el formulario de registro de usuarios.
 * 
 * @param {Object} props - Las propiedades del componente
 * @param {Function} props.handleSubmit - Función para manejar el envío del formulario.
 * @param {Object} props.formData - Los datos del formulario.
 * @param {Function} props.handleChange - Función para manejar los cambios en los campos del formulario.
 * @param {Object} props.errors - Los errores asociados a los campos del formulario. 
 * @returns 
 */
export const RegisterUserForm = ({handleSubmit, formData, handleChange, errors}) => {
  // Extrae los campos del objeto formData
  const {
    firstName,
    lastName,
    userName,
    password,
    confirmPassword,
  } = formData;

  return (
    <main className="main">
      <div className="form-register">
        <div className="logo"></div>
        <form id="registrationForm" method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={errors.firstName ? 'Name' : 'Name'}
            value={firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className={errors.firstName ? 'error' : ''}
          />
          <input
            type="text"
            name="lastName"
            placeholder={errors.lastName ? 'Last Name' : 'Last Name'}
            value={lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className={errors.lastName ? 'error' : ''}
          />
          <input
            type="email"
            name="email"
            placeholder={errors.userName ? 'Email' : 'Email'}
            value={userName}
            onChange={(e) => handleChange("userName", e.target.value)}
            className={errors.userName ? 'error' : ''}
          />
          <input
            type="password"
            name="password"
            placeholder={errors.password ? 'Password' : 'Password'}
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
            className={errors.password ? 'error' : ''}
          />
          <input
            type="password"
            name="password2"
            placeholder={errors.confirPassword ? 'Repeat password' : 'Repeat password'}
            value={confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            className={errors.confirmPassword ? 'error' : ''}
          />
          <button id="registerButton" type="submit">
            Register
          </button>
        </form>
      </div>
    </main>
  );
};