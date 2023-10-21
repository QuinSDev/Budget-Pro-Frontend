import React, { useState } from "react";
import { RegisterUserForm } from "./RegisterUserForm";
import { useNavigate } from "react-router-dom";

/**
 * Componente para el registro de usuarios.
 * @returns La renderización del componente RegisterUserForm.
 */
export const Register = () => {
  // Estado para almacenar los datos del formulario y los errores asociados
  const [formData, setFormdata] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    userName: false,
    password: false,
    confirmPassword: false,
  });

  /**
   * Maneja los cambios en los campos del formulario y actualiza el estado.
   * @param {String} field - El nombre del campo que cambia.
   * @param {String} value - El nuevo valor del campo.
   */
  const handleChange = (field, value) => {
    setFormdata({
      ...formData,
      [field]: value,
    });

    // Restablecer el error del campo cuando cambia
    setErrors({
      ...errors,
      [field]: false,
    });
  };

  /**
   * Realiza la validación del formulario para garantizar que los campo requeridos estén completos.
   * @returns {Boolean} - 'true' si el formulario es válido, 'false' si no lo es.
   */
  const validationForm = () => {
    const newErrors = {};

    if (formData.firstName === "") {
      newErrors.firstName = true;
    }
    if (formData.lastName === "") {
      newErrors.lastName = true;
    }

    if (formData.userName === "") {
      newErrors.userName = true;
    }
    if (formData.password === "" || formData.password.length < 6) {
      newErrors.password = true;
    }
    if (
      formData.confirmPassword === "" ||
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = true;
    }

    setErrors(newErrors);

    // Comprobar si el formulario es válido
    const isValid = Object.values(newErrors).every((values) => !values);

    return isValid;
  };

  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario y, si es válido, inicia el proceso de registro.
   * @param {Event} event - El evento de formulario.
   */
  const handleSumbit = (event) => {
    event.preventDefault();
    const isValid = validationForm();
    if (isValid) {
      submitUser();
    }
  };

  // URL de la API utilizada para registrar usuarios
  const API_URL = "http://localhost:8080/auth/register";

  /**
   * Envá los datos del usuario al servidor para el registro.
   */
  const submitUser = async () => {
    const requesData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      userName: formData.userName,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    const requestOPtions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requesData),
    };

    const response = await fetch(API_URL, requestOPtions);

    // Comprobar el tipo de contenido de la respuesta
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();

      if (data.token) {
        const token = data.token;
        // Almacenar el token en el almacenamiento local
        localStorage.setItem("token", token);
        navigate("/login");
      } else {
        console.error(data.respuesta);
      }
    } else {
      throw new Error("La respuesta del servidor no es un JSON válido");
    }

    setFormdata({
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <RegisterUserForm
        handleSubmit={handleSumbit}
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />
    </>
  );
};
