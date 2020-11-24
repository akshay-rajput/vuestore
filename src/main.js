import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import store from './store/store'
import axios from 'axios'

// tailwind css
import './assets/tailwind.css'
// fontawesome 5
import './assets/fontawesome5/css/all.min.css'
// flaticons
import './assets/lineal_app_icons/flaticon.css'
// custom css styles
import './assets/custom.scss'

// eventbus for modal events
export const eventBus = new Vue();

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://vuestore-app.firebaseio.com'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
