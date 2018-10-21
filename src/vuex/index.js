import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    userID: '',
    // url: 'http://127.0.0.1:5000',
    url: 'http://sixdu.top',
    userLikeSecrets: [],
    userLikeArticles: [],
    userLikeEssays: []
  },
  mutations: {
    login(state) {
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false;
      state.username = '';
      state.userID = ''
    },
    setUrl(state, url) {
      state.url = url
    },
    setUsername(state, username) {
      state.username = username
    },
    setUserID(state, ID) {
      state.userID = ID
    },
    setUserLikeSecrets(state, likeList) {
      state.userLikeSecrets = likeList
    },
    setUserLikeEssays(state, likeList) {
      state.userLikeEssays = likeList
    },
    setUserLikeArticles(state, likeList) {
      state.userLikeArticles = likeList
    },
    addUserLikeSecrets(state, likeId) {
      state.userLikeSecrets.push(likeId)
    },
    addUserLikeEssays(state, likeId) {
      state.userLikeEssays.push(likeId)
    },
    addUserLikeArticles(state, likeId) {
      state.userLikeArticles.push(likeId)
    },
    popUserLikeSecrets(state, index) {
      state.userLikeSecrets.splice(index, 1)
    },
    popUserLikeEssays(state, index) {
      state.userLikeEssays.splice(index, 1)
    },
    popUserLikeArticles(state, index) {
      state.userLikeArticles.splice(index, 1)
    },
  }
});
