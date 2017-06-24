import config from '../lib/config'
import MockFirebaseDB from './mockFirebase'
const firebase = require('firebase')

let database
if (config.firebase.useMockDB) {
  // Setup mock firebase DB
  database = MockFirebaseDB()
} else if (!firebase.apps.length) {
  // Setup real firebase DB
  firebase.initializeApp(config.firebase)
  database = firebase.database()
}

export default database
