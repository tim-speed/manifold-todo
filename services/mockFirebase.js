
export default function MockFirebaseDB() {
  // Setup mock firebase DB
  const firebaseMock = require('firebase-mock')
  const rootRef = new firebaseMock.MockFirebase()
  // Set a 10 MS Timeout to simulate low latency
  rootRef.autoFlush(10)
  const firebaseSDK = firebaseMock.MockFirebaseSdk(path => rootRef.child(path))
  return firebaseSDK.database()
}
