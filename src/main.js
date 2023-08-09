import { createApp } from 'vue'
import router from './router'
import { store } from './store/index'
import svgPlugin from './plugins/svg-plugin.js'

import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'

// import './styles/styles.css'
// import './assets/scss/main.scss'

const app = createApp(App)
app.config.globalProperties.$filters = {
  currencyUSD(amount) {
    return '$' + amount
  },
}

app.use(ElementPlus)
app.use(svgPlugin)
app.use(router)
app.use(store)
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAqeOXGQkI2B7LTIN7GHze2P2r1xqqrSsQ',
  },
})

app.mount('#app')
