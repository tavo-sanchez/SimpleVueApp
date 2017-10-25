// Modules, using to connect the posts with the store
import appService from '../app.service.js'

const state = {
  posts: [],
  categoryId: 0
}

const getters = {
  posts: state => state.posts
}

const actions = {
  updateCategory (context, categoryId) {
    appService.getPosts(categoryId).then(data => {
      context.commit('updateCategory', { categoryId, posts: data })
    })
  }
}

const mutations = {
  updateCategory (state, category) {
    state.categoryId = category.categoryId
    state.posts = category.posts
  }
}

export default {
  // give a namespace so it will wrap all of this into a namespace
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
