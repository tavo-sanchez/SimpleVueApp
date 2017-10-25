// Import Vue and Vue routers, then tell Vue object to use VueRouters
// then instanciate VueRouter and as an argument pass a json string with
// a routes array which will contain the link between routes and components

import Vue from 'vue'
import VueRouter from 'vue-router'
import Category from './theme/Category.vue'
import Login from './theme/Login.vue'
import NotFound from './theme/NotFound.vue'
// Instead of importing each component and load them all together, it's better using the Lazy loading
// so each component will load when it's needed. This are Async components useful when the app grows.
// const Category = () => System.import('./theme/Category.vue')
// const Login = () => System.import('./theme/Login.vue')
// const NotFound = () => System.import('./theme/NotFound.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  // to change the content and works with router-link together
  mode: 'history',
  // change the style (css) of the active element
  linkActiveClass: 'is-active',
  // scroll behaviour to navigate to the position you were before changing page
  // in this example the next page to load will go to the top
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }),
  routes: [
    // Give a name to the router so it can be referenced in the vue file and pass a json string with the name
    // and the params associated in this case the 'id'
    { path: '/category/:id', name: 'category', component: Category },
    { path: '/login', component: Login },
    { path: '/', redirect: '/category/front-end' },
    // using wildcard to the notfound page
    { path: '*', component: NotFound }

  ]
})

// Export view router instance and then import in app.js
export default router
