import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/styles.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)
app.config.globalProperties.$filters = {
    currencyUSD(amount) {
        return '$' + amount
    },
}

app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAqeOXGQkI2B7LTIN7GHze2P2r1xqqrSsQ',
    },
})

app.mount('#app')
