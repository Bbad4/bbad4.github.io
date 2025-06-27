import { app, analytics, auth, messaging, messagingSw } from './js/firebase.js'
import { appObj, logo } from './js/firebase.js'
import { parsePayload } from './js/functions.js'


const messagingSwObj = messagingSw.getMessaging(appObj)


//onBackgroundMessage
messagingSw.onBackgroundMessage(messagingSwObj, (payload) => {
    const { title, options } = parsePayload(payload, logo)
    self.registration.showNotification(title, options)
})