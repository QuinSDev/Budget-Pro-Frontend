import React, { useState } from "react";
import { RegisterUserForm } from "./RegisterUserForm";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    lastName: false,
    email: false,
    password: false,
    password2: false,
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
    // Limpiar el error cuando el ususario modifica el campo.
    setErrors({ ...errors, name: false });
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setErrors({ ...errors, lastName: false });
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: false });
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: false });
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    setErrors({ ...errors, password2: false });
  };

  const validationForm = () => {
    const newErrors = {};

    if (name === "") {
      newErrors.name = true;
    }
    if (lastName === "") {
      newErrors.lastName = true;
    }

    if (email === "") {
      newErrors.email = true;
    }
    if (password === "" || password.length < 6) {
      newErrors.password = true;
    }
    if (password2 === "" || password !== password2) {
      newErrors.password2 = true;
    }

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((values) => values);

    return isValid;
  };

  const navigate = useNavigate();

  const handleSumbit = (event) => {
    event.preventDefault();
    const isValid = validationForm();
    if (isValid) {
      submitUser();
    }
  };

  const submitUser = async () => {
    try {
      const peticion = await fetch("http://localhost:8080/registro", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          lastName: lastName,
          email: email,
          password: password,
          password2: password2,
        }),
      });

      const contentType = peticion.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await peticion.json();
        if (data.sucess) {
          navigate("/login");
        } else {
          console.error(data.respuesta);
          alert(data.respuesta);
        }
      } else {
        throw new Error("La respuesta del servidor no es un JSON válido");
      }
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      alert("Error al guardar usuario");
    }

    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  return (
    <>
      <RegisterUserForm
        handleSubmit={handleSumbit}
        name={name}
        lastName={lastName}
        email={email}
        password={password}
        password2={password2}
        handleNameChange={handleNameChange}
        handleLastNameChange={handleLastNameChange}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handlePassword2Change={handlePassword2Change}
        errors={errors}
      />
    </>
  );
};
