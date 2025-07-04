import * as app from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js'
import * as analytics from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js'
import * as auth from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js'
import * as messaging from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging.js'
import * as messagingSw from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-sw.js'

const firebaseConfig = {
    apiKey: 'AIzaSyCczPZXMW4bRfrbtqUqGJdBdQlRvP5Neqc',
    authDomain: 'bbad-463819.firebaseapp.com',
    projectId: 'bbad-463819',
    storageBucket: 'bbad-463819.firebasestorage.app',
    messagingSenderId: '586175350146',
    appId: '1:586175350146:web:a309dfc7e1b344a255bb9b',
    measurementId: 'G-P7GB57L7FF'
}
const appObj = app.initializeApp(firebaseConfig)


//
export { app, analytics, auth, messaging, messagingSw, appObj }