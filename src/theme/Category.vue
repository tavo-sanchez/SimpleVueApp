<template>
  <div class="columns">
    <div class="column is-one-third" v-for="(post, title) in posts" v-bind:key="post.id">
      <app-post :link="post.rest_api_enabler.link">
        <h3 slot="title" v-html="post.title.rendered"></h3>
        <span slot="content" v-html="post.excerpt.rendered">
        </span>
      </app-post>
    </div>
  </div>
</template>
<script>
  import Post from './Post.vue'
  import { mapGetters } from 'vuex'

  const fetchInitialData = (store, route) => {
    let categoryId = 2
    if (route.params.id === 'mobile') {
      categoryId = 11
    }
    return store.dispatch('postsModule/updateCategory', categoryId)
  }
  export default {
    asyncData (store, route) {
      return fetchInitialData(store, route)
    },
    components: {
      'app-post': Post
    },
    computed: {
      ...mapGetters('postsModule', ['posts'])
    },
    methods: {
      loadPost () {
        fetchInitialData(this.$store, this.$route)
      }
    },
    // Create a watcher to 'watch' for the route change and assign the id from the parameters
    // also will execute some action once this changed
    watch: {
      '$route' (to, from) {
        this.loadPost()
      }
    },
    // everytime it's created then call loadPost but this not reload to other routers
    created () {
      this.loadPost()
      // reference the query parameters directly from the route object
      // console.log(this.$route.query)
    }
  }
</script>
