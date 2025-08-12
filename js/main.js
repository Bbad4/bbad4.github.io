import './firebase.js'
import './auth.js'
import './subscription.js'
import './install.js'
import { app, analytics, auth, messaging, messagingSw, appObj } from './firebase.js'


//
await navigator.serviceWorker.register('service-worker.js', { type: 'module' })


//
analytics.getAnalytics(appObj)


//
document.addEventListener('click', (event) => {
    if (event.target.closest('body > * > *') && !event.target.closest('.grid_intro > :nth-child(2)')) {
        navigator.vibrate?.(10)
    }
})
