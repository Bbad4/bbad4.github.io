import { app, analytics, auth, messaging, messagingSw } from './firebase.js'
import { appObj, packageName, vapidKey } from './firebase.js'
import {toggleFabText, sendSignInLinkToEmail, signInWithEmailLink, getToken, signOut, parsePayload } from './functions.js'

const analyticsObj = analytics.getAnalytics(appObj)
const authObj = auth.getAuth(appObj)
const messagingObj = messaging.getMessaging(appObj)

const buttonFab = document.querySelector('#button_fab')
const buttonsignIn = document.querySelector('#button_sign_in')
const buttonDownloadApp = document.querySelector('#button_download_app')


//vibrate
document.addEventListener('click', (e) => e.target.closest('button') && navigator.vibrate?.(10))


//toggleFabText
document.addEventListener('scroll', () => toggleFabText(authObj, buttonFab))


//onAuthStateChanged
auth.onAuthStateChanged(authObj, () => {
    toggleFabText(authObj, buttonFab)

    buttonsignIn.textContent = authObj.currentUser ? 'Sign Out' : 'Sign In'
    buttonsignIn.onclick = async () => authObj.currentUser ? await signOut(authObj) : await sendSignInLinkToEmail(authObj, packageName)
})


//signInWithEmailLink
await auth.isSignInWithEmailLink(authObj, location.href) && await signInWithEmailLink(authObj)


//getToken
if (await Notification.requestPermission() === 'granted') {
    await getToken(messagingObj, vapidKey)
}


//buttonDownloadApp
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    buttonDownloadApp.hidden = false
    buttonDownloadApp.onclick = async () => {
        try {
            e.prompt()
        }
        catch (error) {
            console.log(`pwa not supported`)
        }
    }
})


//onMessage
messaging.onMessage(messagingObj, (payload) => {
    const { title, options } = parsePayload(payload)
    new Notification(title, options)
})