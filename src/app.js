import Vue from 'vue'
// Import the components .vue files
import AppLayout from './theme/Layout.vue'
// Import router instance here
import router from './router'
// Import the store for state-management
import store from './vuex/index.js'

// It is possible to have the components in here but it's better having them in their own .vue files
/*
  Vue.component('app', {
  template: `
    <div id="app">
    <nav class="nav has-shadow">
      <div class="container">
        <a href="/">
          <img src="http://bit.ly/vue-img" alt="Vue SPA">
        </a>
      </div>
    </nav>
    <section class="main-section section"></section>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          Follow us on <a href="https://twitter.com/zurddo" target="_blank">Twitter</a>
        </div>
      </div>
    </footer>
  </div>
  `
})
*/

const app = new Vue({
  router,
  ...AppLayout,
  store
  // not uset anymore for some reason with the ecma6
  // render: h => h(AppLayout)
  // render: h => h('app')
})

export { app, router, store }
