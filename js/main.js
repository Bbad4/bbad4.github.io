import { app, analytics, auth, messaging, messagingSw } from './firebase.js'
import { appObj, packageName, vapidKey, logo } from './firebase.js'
import { sendSignInLinkToEmail, signInWithEmailLink, getToken, parsePayload } from './functions.js'


const analyticsObj = analytics.getAnalytics(appObj)
const authObj = auth.getAuth(appObj)
const messagingObj = messaging.getMessaging(appObj)

const toggleFab = () => document.querySelector('.fab').classList.toggle('expanded', scrollY < 50);
addEventListener('scroll', toggleFab);
toggleFab();


//vibrate
document.addEventListener('click', (event) => event.target.closest('button') && navigator.vibrate(10))


//sendSignInLinkToEmail
document.getElementById('email_login').addEventListener('click', async () => {
    await sendSignInLinkToEmail(authObj, packageName)
})


//signInWithEmailLink
if (await auth.isSignInWithEmailLink(authObj, location.href)) {
    await signInWithEmailLink(authObj)
}


//getToken
if (await Notification.requestPermission() === 'granted') {
    await getToken(messagingObj, vapidKey)
}


//onMessage
messaging.onMessage(messagingObj, (payload) => {
    const { title, options } = parsePayload(payload, logo)
    new Notification(title, options)
})






//onAuthStateChanged
async function f0(usercreds) {
  if (usercreds) {
    document.querySelector('.button_fab').style.backgroundColor = "green";
  } else {
    document.querySelector('.button_fab').style.backgroundColor = "red";
  }
}

auth.onAuthStateChanged(authObj, f0);