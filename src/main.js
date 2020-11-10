import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import store from './store/store'

// tailwind css
import './assets/tailwind.css'
// fontawesome 5
import './assets/fontawesome5/css/all.min.css'
// custom css styles
import './assets/custom.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
