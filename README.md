# Coderise Firebase Demo
> Un simple ejemplo de como utilizar Firebase Database para crear y leer datos en tiempo real

![Coderise Logo](http://coderise.org/wp-content/uploads/2016/02/coderise-logo.png)

## Overview

Firebase es una plataforma de back-end para construir aplicaciones Web, Android e IOS. Ofrece una base de datos en tiempo real, diferentes API, múltiples tipos de autenticación y plataforma de alojamiento. Este es un tutorial introductorio que cubre los conceptos básicos de la plataforma Firebase y explica cómo tratar con sus diversos componentes y subcomponentes.

## Audience

Este tutorial está dirigido a desarrolladores que necesitan una plataforma back-end simple y fácil de usar. Después de terminar este tutorial, estará familiarizado con la plataforma web de Firebase. También puede usar esto como referencia en su desarrollo futuro. Este tutorial está destinado a hacerte sentir cómodo para comenzar a utilizar la plataforma back-end de Firebase y sus diversas funciones.

## Prerequisites

Necesitará conocimientos de JavaScript para poder seguir este tutorial. El conocimiento sobre alguna plataforma de backend no es necesario, pero podría ayudarte a comprender los diversos conceptos de Firebase.

## Start Guide

### Crear app en FirebasE

Ir a [Firebase](https://console.firebase.google.com/) y hacer clic en la opcion `Crear proyecto`, la plataforma abrirá una ventama modal donde le solicita el nombre para su proyecto.

Luego de crear el proyecto sera dirigido a `https://console.firebase.google.com/project/<YOUR_PROJECT_NAME>/overview` 

### Añade Firebase a tu aplicación web

Como nuestro proyecto es web y vamos a utilizar javascript como lenguaje de programación vamos a escoger la opcion **Añade Firebase a tu aplicación web** 

Esta opción nos indica que debemos copiar y pegar el fragmento que se indica a continuación en la parte inferior de nuestro código HTML, delante de otras etiquetas de secuencia de comandos.

```html
<script src="https://www.gstatic.com/firebasejs/4.6.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);
</script>
```

*Ejemplo final*

```html
<body>
  ...
  <div class="container-fluid">
    ...
  </div>

  <!-- Codigo agregado -->
  <script src="https://www.gstatic.com/firebasejs/4.6.0/firebase.js"></script>
  <script>
    // Initialize Firebase
    var config = {
      apiKey: "<API_KEY>",
      authDomain: "<PROJECT_ID>.firebaseapp.com",
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
      storageBucket: "<BUCKET>.appspot.com",
      messagingSenderId: "<SENDER_ID>",
    };
    firebase.initializeApp(config);
  </script>
</body>
```
Ya estás listo para comenzar a usar Firebase Realtime Database.

### Obtén una referencia a una base de datos

Para leer y escribir en la base de datos, necesitas una instancia de firebase.database.Reference:

```javascript
// Get a reference to the database service
var database = firebase.database();
```

### Escritura de datos

Para recuperar los datos de Firebase, se debe agregar un agente de escucha asíncrono a f`irebase.database.Reference`. El agente de escucha se activa una vez para el estado inicial de los datos y otra vez cuando los datos cambian.

Para ejecutar operaciones de escritura básicas, puedes usar `set()` para guardar datos en una referencia que especifiques y reemplazar los datos existentes en esa ruta de acceso. Por ejemplo, En nuestro ejemplo queda de la siguiente manera:

```javascript
// Funcion para guardar el usuario
function saveUser(evt) {
  evt.preventDefault();

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var age = document.getElementById('age').value;

  var id = 'algo unico'; // Puede ser el email
  firebase.database().ref(`users/${id}`).set({
    name: name,
    email: email,
    age: email
  });
}
```
Pero es necesario tener un formulario en nuestro HTML, he aquí este:

```html
<form name="form">
  <div class="form-group">
    <label for="name">Nombre</label>
    <input type="text" class="form-control" id="name" placeholder="Tu fabuloso nombre" required>
  </div>
  <div class="form-group">
    <label for="email">Correo Electronico</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="pepitp@pomita.com" required>
  </div>
  <div class="form-group">
    <label for="age">Edad</label>
    <input type="number" class="form-control" id="age" placeholder="Escribe tu edad" required>
  </div>
  <button type="submit" class="btn btn-primary" onclick="saveUser(event);">Guardar</button>
</form>
```

### Lectura de datos

Para leer los datos necesitamos referenciar nuestro objeto/tabla que necesitamos usando la funcion `ref()` en nuestro ejemplo para traer los usuarios utilizamos el siguiente codigo javascript:

```javascript
// funcion para leer todos los usuarios 
function readUserData() {
  var users = firebase.database().ref('users/');

  // la funcion ON se queda escuchando si existe algun cambio
  // en alguno de ellos.
  users.on('value', function (snapshot) {
    // llamado a la funcion dibujar
    refreshUI(snapshot.val());
  });
}

// Funcion que pinta/dibuja los usuarios en una tabla
function refreshUI(users) {
  var tBody = '';
  Object.keys(users).forEach(function (key) {
    var tRow =
      `
      <tr>
        <th scope="row">${key}</th>
        <td>${users[key].name}</td>
        <td>${users[key].email}</td>
        <td>${users[key].age}</td>
      </tr>
    `;
    tBody += tRow;
  });

  // tBody debe ser agregado al html
  document.getElementById('usersList').innerHTML = tBody;
};
```

Nuestro html para listar los usuarios es asi:

```html
<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody id="usersList">
    <!-- aca va a insetarse nuestros usuarios -->
  </tbody>
</table>
```

Esto es todo, espero les pueda ayudar a todos!!:bowtie: :mortar_board: :bowtie:
