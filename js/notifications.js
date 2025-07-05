import { app, analytics, auth, messaging, messagingSw, appObj } from './firebase.js'

const messagingObj = messaging.getMessaging(appObj)
const vapidKey = 'BGSRWDIlB3_gYexkKxU2TaTcHiq5WKgR_85gkmvGtKki8zXe4RZyCCa6aluWGjr0UlYbTMB9zkM8oC4Qbdxpp-o'
const itemKey = 'notificationsDenied'
const buttonNotifications = document.querySelector('#button_notifications')
let isFullyGranted


//
const getToken = async () => {
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


//
const notificationsState = async () => {
    isFullyGranted = Notification.permission === 'granted' && !localStorage.getItem(itemKey)
    buttonNotifications.textContent = isFullyGranted ? 'UnSubscribe 🔴' : 'Subscribe 🟢'
    if (isFullyGranted) await getToken()
}

await notificationsState()


//
buttonNotifications.onclick = async () => {
    if (isFullyGranted) {
        await messaging.deleteToken(messagingObj)
        localStorage.setItem(itemKey, '1')
        alert(`UnSubscribed 🔴`)
    }
    else if (Notification.permission === 'granted' || await Notification.requestPermission() === 'granted') {
        localStorage.removeItem(itemKey)
        alert(`Subscribed 🟢`)
    }
    else if (Notification.permission === 'denied') {
        alert(`notification permission denied 🔴`)
    }

    await notificationsState()
}


//
const parsePayload = (payload) => {
    const title = payload.notification?.title || ''
    const options = {
        icon: payload.notification?.icon,
        body: payload.notification?.body,
        image: payload.notification?.image,
        data: payload.data
    }
    console.log(`parsePayload 🟢 ${title} 🟢 ${JSON.stringify(options)}`)

    return { title, options }
}


//
messaging.onMessage(messagingObj, (payload) => {
    const { title, options } = parsePayload(payload)
    new Notification(title, options)
})