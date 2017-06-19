const firebase = require('firebase')

const config = {
  apiKey: '',
  authDomain: 'manifold-todo-57b6e.firebaseapp.com',
  databaseURL: 'https://manifold-todo-57b6e.firebaseio.com',
  projectId: 'manifold-todo-57b6e',
  storageBucket: 'manifold-todo-57b6e.appspot.com',
  messagingSenderId: '1098346890773'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const database = firebase.database()

export default database
