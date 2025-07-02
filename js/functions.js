import { app, analytics, auth, messaging, messagingSw } from './firebase.js'


async function sendSignInLinkToEmail(authObj, packageName) {
    try {
        const email = prompt('enter email')
        const actionCodeSettings = {
            url: location.origin,
            handleCodeInApp: true,
            android: {
                packageName: packageName,
                installApp: true,
            }
        }
        await auth.sendSignInLinkToEmail(authObj, email, actionCodeSettings)
        localStorage.setItem('email', email)
        alert(`sendSignInLinkToEmail 🟢 ${email}`)
    }
    catch (error) {
        alert(`sendSignInLinkToEmail 🔴 ${error.message}`)
    }
}


async function signInWithEmailLink(authObj) {
    try {
        const email = localStorage.getItem('email') || prompt('Enter email to complete sign-in')
        await auth.signInWithEmailLink(authObj, email, location.href)
        localStorage.removeItem('email')
        location.href = '/'
        alert(`signInWithEmailLink 🟢 ${email}`)
    }
    catch (error) {
        location.href = '/'
        alert(`signInWithEmailLink 🔴 ${error.message}`)
    }
}


async function getToken(messagingObj, vapidKey) {
    try {
        const tokenOptions = {
            vapidKey: vapidKey,
            serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()
        }
        const token = await messaging.getToken(messagingObj, tokenOptions)
        console.log(`getToken 🟢 ${token}`)
    } 
    catch (error) {
        console.log(`getToken 🔴 ${error.message}`)
    }
}


async function signOut(authObj) {
    try {
        await auth.signOut(authObj)
        alert(`signOut 🟢`)
    } 
    catch (error) {
        alert(`signOut 🔴 ${error.message}`)
    }
}


function parsePayload(payload) {
    const title = payload.notification?.title || 'New Notification'
    const options = {
        icon: payload.notification?.icon || 'assets/logo_light_mobile.png',
        body: payload.notification?.body || 'Hi there!',
        image: payload.notification?.image || null,
        data: payload.data || {}
    }
    console.log(`parsePayload 🟢 ${title} 🟢 ${options}`)

    return { title, options }
}


export { sendSignInLinkToEmail, signInWithEmailLink, getToken, parsePayload, signOut }