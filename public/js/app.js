'use strict';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyABSPVHKtCvGUGcXyYZ-CGY2KmL0Iw0eFE",
  authDomain: "code-rise-demo.firebaseapp.com",
  databaseURL: "https://code-rise-demo.firebaseio.com",
  projectId: "code-rise-demo",
  storageBucket: "code-rise-demo.appspot.com",
  messagingSenderId: "748625408126"
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

// Initial load data
readUserData();

// Shortcuts to DOM Elements.
const $nameInput = document.getElementById('name');
const $emailInput = document.getElementById('email');
const $ageInput = document.getElementById('age');
const $usersList = document.getElementById('usersList');

/**
* @description  save object User from document form
*/
function saveUser(evt) {
  evt.preventDefault();

  const name = $nameInput.value;
  const email = $emailInput.value;
  const age = $ageInput.value;


  const id = generateUUID();
  database.ref(`carritos/${id}`).set({
    name,
    email,
    age
  });
}

/**
* @description  write object User in firebase
*/
function writeUserData(name, email, age) {
  const id = generateUUID();
  firebase.database().ref(`users/${id}`).set({
    name,
    email,
    age
  });
}

/**
* @description  read realtime from firebase
*/
function readUserData() {
  const users = database.ref('users/');
  users.on('value', function (snapshot) {
    refreshUI(snapshot.val());
  });
}

/**
* @description  Show all users in table
*/
function refreshUI(users) {
  let tBody = '';
  Object.keys(users).forEach(function (key) {
    const tRow =
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

  $usersList.innerHTML = tBody;
};

/**
* @description  Generate an UUID
*/
function generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};
