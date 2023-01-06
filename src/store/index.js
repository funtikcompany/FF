import { createStore } from 'vuex'
import axiosInstance from '@/api/index'
import { POSTS_COMMENT } from '@/api/routes'
import { POSTS } from '@/api/routes'

export default createStore({
  state: {
    posts: {},
    comment: {},
  },
  getters: {
    getPosts(state) {
      return state.posts
    },
    getComments(state) {
      return state.comment
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setComments(state, comment) {
      state.comment = comment
    },
  },
  actions: {
    fetchPosts({ commit }) {
      return axiosInstance.get(POSTS())
        .then((posts) => {
          commit('setPosts', posts.data);
        })
        .catch(err => console.log(err))
    },
    fetchComment({ commit }) {
      return axiosInstance.get(POSTS_COMMENT())
        .then((comment) => {
          commit('setComments', comment.data);
        })
        .catch(err => console.log(err))
    },
  },
  modules: {
  }
})
