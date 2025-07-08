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
document.addEventListener('click', (event) => event.target.closest('button') && navigator.vibrate?.(15))