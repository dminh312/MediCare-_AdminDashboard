require('dotenv').config();
const admin = require('firebase-admin');

// Ensure Private Key is properly formatted with newlines if it comes from .env
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  })
});

const adminAuth = admin.auth();
const db = admin.firestore();

module.exports = { admin, adminAuth, db };
