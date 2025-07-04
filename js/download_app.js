import { app, analytics, auth, messaging, messagingSw, appObj } from './firebase.js'

const buttonDownloadApp = document.querySelector('#button_download_app')


//
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    buttonDownloadApp.hidden = false
    buttonDownloadApp.textContent = 'Download App'
    buttonDownloadApp.installPrompt = event
})


//
buttonDownloadApp.onclick = async () => {
    try {
        const event = buttonDownloadApp.installPrompt
        event.prompt()
        const { outcome } = await event.userChoice
        if (outcome === 'dismissed') return
        buttonDownloadApp.hidden = true
        alert(`downloadApp 🟢`)
    } catch (error) {
        alert(`downloadApp 🔴 ${error.message}`)
    } 
}