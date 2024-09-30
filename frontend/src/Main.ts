import '../src/style.css'
// Import our custom CSS

// Import all of Bootstrap's JS

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')