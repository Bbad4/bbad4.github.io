import { app, analytics, auth, messaging, messagingSw, appObj } from './firebase.js'

const authObj = auth.getAuth(appObj)
const itemKey = 'userEmail'
const buttonFab = document.querySelector('#button_fab')
const buttonsignIn = document.querySelector('#button_sign_in')


//
const sendSignInLinkToEmail = async () => {
    try {
        const email = prompt('enter email')
        if (email === null) return
        const actionCodeSettings = {
            url: location.origin,
            handleCodeInApp: true,
        }
        await auth.sendSignInLinkToEmail(authObj, email, actionCodeSettings)
        localStorage.setItem(itemKey, email)
        alert(`sendSignInLinkToEmail 🟢 ${email}`)
    }
    catch (error) {
        alert(`sendSignInLinkToEmail 🔴 ${error.message}`)
    }
}


//
const signInWithEmailLink = async () => {
    try {
        const email = localStorage.getItem(itemKey) || prompt('Enter email to complete sign-in')
        await auth.signInWithEmailLink(authObj, email, location.href)
        localStorage.removeItem(itemKey)
        location.href = '/'
        alert(`signInWithEmailLink 🟢 ${email}`)
    }
    catch (error) {
        location.href = '/'
        alert(`signInWithEmailLink 🔴 ${error.message}`)
    }
}


//
const signOut = async () => {
    try {
        await auth.signOut(authObj)
        alert(`signOut 🟢`)
    } 
    catch (error) {
        alert(`signOut 🔴 ${error.message}`)
    }
}


//
auth.onAuthStateChanged(authObj, (currentUser) => {
    buttonFab.textContent = `Hi ${currentUser?.email.split('@')[0] || 'there'}` 

    buttonsignIn.textContent = currentUser ? 'Sign Out 🔴' : 'Sign In 🟢'
    buttonsignIn.onclick = async () => currentUser ? await signOut() : await sendSignInLinkToEmail()
})


//
if (await auth.isSignInWithEmailLink(authObj, location.href)) await signInWithEmailLink()