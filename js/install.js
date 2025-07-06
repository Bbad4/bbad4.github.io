import { app, analytics, auth, messaging, messagingSw, appObj } from './firebase.js'

const buttonInstall = document.querySelector('#button_install')


//
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    buttonInstall.hidden = false
    buttonInstall.textContent = 'Install App'
    buttonInstall.installPrompt = event
})


//
buttonInstall.onclick = async () => {
    try {
        const event = buttonInstall.installPrompt
        event.prompt()
        const { outcome } = await event.userChoice
        if (outcome === 'dismissed') return
        buttonInstall.hidden = true
        alert(`Installed 🟢`)
    } catch (error) {
        alert(`Not Installed 🔴 ${error.message}`)
    } 
}