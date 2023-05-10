import { setAuthToken,getAuthToken} from '../services/authService'
 const apiUrl = import.meta.env.VITE_API_URL;

 export async function addUser(user) {
  try {
    const response = await fetch(`${apiUrl}/user/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    const status = response.status;
    if(status === 200 && data.token){setAuthToken(data.token)}
    return [data,status]
  } catch (error) {
    console.error(error);
    throw new Error('Error al agregar usuario');
  }
}

export async function editUser(user) {
  try {
    const response = await fetch(`${apiUrl}/user/editUser`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    const status = response.status;
    return [data,status]
  } catch (error) {
    console.error(error);
    throw new Error('Error al agregar usuario');
  }
}




/*

var raw = JSON.stringify({
  "name": "Dylan",
  "surname": "Seltzer",
  "email": "dylan.seltzer.et32@gmail.com",
  "userName": "dylansel32",
  "password": "dylan32",
  "photo": "dylan32.jpg"
});

*/