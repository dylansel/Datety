var myHeaders = new Headers();


var raw = JSON.stringify({
  "name": "Dylan",
  "surname": "Seltzer",
  "email": "dylan.seltzer.et32@gmail.com",
  "userName": "dylansel32",
  "password": "dylan32",
  "photo": "dylan32.jpg"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

//-----------------------------------------

var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var myRequest = new Request('flowers.jpg', myInit);

fetch(myRequest)
.then(function(response) {
  return response.blob();
})
.then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});

//-----------------------------------------

fetch(`${REACT_APP_API_URL}/user/addUser`)
.then(function(response) {
  if(response.ok) {
    response.blob().then(function(miBlob) {
      var objectURL = URL.createObjectURL(miBlob);
      miImagen.src = objectURL;
    });
  } else {
    console.log('Respuesta de red OK pero respuesta HTTP no OK');
  }
})
.catch(function(error) {
  console.log('Hubo un problema con la petición Fetch:' + error.message);
});

//-----------------------------------------






fetch(`${REACT_APP_API_URL}/user/addUser`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));