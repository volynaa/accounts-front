import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/main.scss'
import '@/styles/variable.scss'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
