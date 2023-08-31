const admin = require('firebase-admin');
const serviceAccount = require('./assets/auth.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bustracker-6b2a1-default-rtdb.firebaseio.com/',
});
const db = admin.database();
