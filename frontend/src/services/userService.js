import { setAuthToken, getAuthToken } from "../services/authService";
const apiUrl = import.meta.env.VITE_API_URL;

export async function addUser(user) {
  try {
    const response = await fetch(`${apiUrl}/user/addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    const status = response.status;
    if (status === 200 && data.token) {
      setAuthToken(data.token);
    }
    return [data, status];
  } catch (error) {
    console.error(error);
    throw new Error("Error al agregar usuario");
  }
}

export async function editUser(user) {
  try {
    const response = await fetch(`${apiUrl}/user/editUser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    const status = response.status;
    return [data, status];
  } catch (error) {
    console.error(error);
    throw new Error("Error al editar usuario");
  }
}

export async function getUser() {
  try {
    const response = await fetch(`${apiUrl}/user/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await response.json();
    const status = response.status;
    return {data:data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al solicitar usuario");
  }
}

export async function deleteUser() {
  try {
    const response = await fetch(`${apiUrl}/user/deleteUser`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await response.json();
    const status = response.status;
    return [data, status];
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar usuario");
  }
}

export async function login(user) {
  try {
    const response = await fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    const status = response.status;
    if (status === 200 && data.token) setAuthToken(data.token);
    return [data, status];
  } catch (error) {
    console.error(error);
    throw new Error("Error al iniciar sesion");
  }
}

export async function confirmEmailByToken(token) {
  try {
    const response = await fetch(`${apiUrl}/user/confirmEmail/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const status = response.status;
    return {data, status};
  } catch (error) {
    console.error(error);
    throw new Error("Error al iniciar sesion");
  }
}


/*

 const user = {
      name: "Gonzalo",
      surname: "Sanchez",
      email: "Gonzalo.sanchezz.et32@gmail.com",
      userName: "GonzaloS",
      password: "GonzaloS",
      photo: "GonzaloS.jpg"
  }

  const userEdit = {
    name: "diego",
    photo: "diegooo.jpg"
}
const userLogin = {
    "user":"mariag",
    "password":"mariag123"
}





  const modificar = async () => {
    try {
      const [result,status] = await editUser(userEdit)
      if(status == 200){
       console.log("se modifico correctamente")
      }else{
        console.error(`API CODE ERR: "${result.message}"`)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const leer = async () => {
    try {
      const [result,status] = await getUser()
      if(status == 200){
       console.log("------------- LEER --------------")
       console.log(result)
      }else{
        console.error(`API CODE ERR: "${result.message}"`)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const eliminar = async () => {
    try {
      const [result,status] = await deleteUser()
      if(status == 200){
       console.log("se elimino correctamente")
      }else{
        console.error(`API CODE ERR: "${result.message}"`)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const logearse = async () =>{
    try {
      const [result,status] = await login(user)
      if(status == 200){
       console.log("se creo correctamente")
      }else if(result.message){
        console.warn(`API CODE Warn: "${result.message}"`)
      }else{
        console.error(`API CODE Error: "${result.error}"`)
      }
    } catch (error) {
      console.log(error)
    }
  }


*/
