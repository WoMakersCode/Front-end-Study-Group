import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../api/Api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { // guarda todos os estados que iremos gerenciar no vuex
    posts: []
  },

  actions: { // acoes que serão disparadas pelo vue, para alterar o estado
    loadPostsList: function ({ // carrega todos os posts da nossa API
      commit
    }) {
      Api().get('/posts')
        .then((response) => {
          commit('SET_POSTS_LIST', {
            list: response.data
          }, (err) => {
            console.log(err)
          })
        })
    },

    async createPost({ // Cria um novo post passando as informacoes dentro de um objeto chamado newPostInfo
      state,
      dispatch,
      commit
    }, newPostInfo) {
      await Api().post('posts', {
        user: newPostInfo.user,
        title: 'title',
        content: newPostInfo.content
      })
      return dispatch('loadPostsList', {
        commit
      })
    },

    async deletePost({ // remove um post da API, passando o id do post que deve ser removido
      state,
      dispatch,
      commit
    }, post) {
      await Api().delete(`posts/${post._id}`)
      return dispatch('loadPostsList', {
        commit
      })
    }

  },

  mutations: { // mutations sao disparadas por actions e sao responsaveis por efetivamente mudar o estado das variaveis no vuex
    SET_POSTS_LIST: (state, {
      list
    }) => {
      state.posts = list.data
    }
  },

  getters: { // getters sao responsaveis por pegar as informacoes do state
    getPostsList: state => state.posts
  }
})

export default store
