import { createApp } from 'vue'
import store from '@/stores'
import router from '@/routes'
import 'uno.css'
import '@/style.css'
import '@/routes/permissions'

import App from './App.vue'

createApp(App)
.use(store)
.use(router)
.mount('#app')
