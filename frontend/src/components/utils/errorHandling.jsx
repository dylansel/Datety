import React from "react";

export function errorMessageConverter(errorMessage) {
  const conversiones = {
    "Email already exists": "El email ya existe",
    "User already taken": "El usuario ya existe",
    "Invalid password": "Contraseña inválida",
  };

  if (errorMessage in conversiones) {
    return conversiones[errorMessage];
  } else {
    return errorMessage;
  }
}
