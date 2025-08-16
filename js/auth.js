import { app, analytics, auth, messaging, messagingSw, appObj } from './firebase.js'

const authObj = auth.getAuth(appObj)
const itemKey = 'userEmail'
const buttonAuth = document.querySelector('#button_auth')


//
const sendSignInLinkToEmail = async () => {
    try {
        const email = prompt('Enter Email')
        if (email === null) return
        const actionCodeSettings = {
            url: location.origin,
            handleCodeInApp: true,
        }
        await auth.sendSignInLinkToEmail(authObj, email, actionCodeSettings)
        localStorage.setItem(itemKey, email)
        alert(`Sign-In link sent 🟢 ${email}`)
    }
    catch (error) {
        alert(`Sign-In link not sent 🔴 ${error.message}`)
    }
}


//
const signInWithEmailLink = async () => {
    try {
        const email = localStorage.getItem(itemKey) || prompt('Enter Email to complete Sign In')
        await auth.signInWithEmailLink(authObj, email, location.href)
        localStorage.removeItem(itemKey)
        location.href = '/'
        alert(`Signed-In 🟢 ${email}`)
    }
    catch (error) {
        location.href = '/'
        alert(`Not Signed-In 🔴 ${error.message}`)
    }
}


//
const signOut = async () => {
    try {
        await auth.signOut(authObj)
        alert(`Signed-Out 🟢`)
    } 
    catch (error) {
        alert(`Not Signed-Out 🔴 ${error.message}`)
    }
}


//
auth.onAuthStateChanged(authObj, (currentUser) => {
    buttonAuth.textContent = currentUser ? `(${currentUser.email.split('@', 1)}) Sign Out 🔴` : 'Sign In 🟢'
    buttonAuth.onclick = async () => currentUser ? await signOut() : await sendSignInLinkToEmail()
})


//
if (await auth.isSignInWithEmailLink(authObj, location.href)) await signInWithEmailLink()