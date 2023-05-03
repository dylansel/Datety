

export async function addUser(user) {
  try {
    const response = await fetch(`http://130.10.1.14:3000/user/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    const status = await response.status();
    return data,status
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