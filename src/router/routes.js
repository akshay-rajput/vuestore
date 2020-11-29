import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import UserWishlist from '../views/Wishlist.vue'
import Product from '../views/Product.vue'
import current_store from '../store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:productid',
    name: 'Product',
    component: Product
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    beforeEnter(to, from, next){
      if(current_store.state.idToken){
        console.log("IdToken to goto cart page: ", current_store.state.idToken);
        next()
      }
      else{
        next('/')
      }
    }
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: UserWishlist,
    beforeEnter(to, from, next){
      if(current_store.state.idToken){
        console.log("IdToken to goto Wishlist: ", current_store.state.idToken);
        next()
      }
      else{
        next('/')
      }
    }
  }
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash;
      console.log("scrolling to == ",to)

      // specify offset of the element
      if (to.hash === '#anchor2') {
        position.offset = { y: 100 }
      }
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  scrollBehavior,
  base: process.env.BASE_URL,
  routes
})

export default router
