import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

Vue.config.debug = true;

export default new Vuex.Store({
  state: {
    auth_status: '',
    auth_error: '',
    // permission_status: '',
    // finance_status: '',
    // finance_error: '',
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
    // role: '',
    // permissions: [],
    // finance: {
    //   balance: 0,
    //   hold_balance: 0
    // }
  },
  mutations: {
    //AUTH REQUEST STATUS COMMIT
    auth_request(state) {
      state.auth_status = 'loading'
    },
    auth_success(state, payload) {
      state.auth_status = 'success'
      state.token = payload.token
      state.username = payload.username
    },
    auth_error(state, message) {
      state.auth_status = 'error'
      state.auth_error = message
    },
    //PERMISSIONS REQUEST STATUS COMMIT
    // permissions_request(state) {
    //   state.permission_status = 'loading'
    // },
    // permissions_success(state, payload) {
    //   state.permission_status = 'success'
    //   state.permissions = payload.permissions
    //   state.role = payload.role
    // },
    // permissions_error(state) {
    //   state.permission_status = 'error'
    // },
    //INCOME REQUEST STATUS COMMIT
    // finance_request(state) {
    //   state.finance_status = 'loading'
    // },
    // finance_success(state, payload) {
    //   state.finance_status = 'success'
    //   state.finance.balance = payload.balance
    //   state.finance.hold_balance = payload.hold_balance
    // },
    // finance_error(state, err) {
    //   state.finance_status = 'error'
    //   state.finance_error = err
    // },
    //LOGOUT REQUEST
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: 'http://back.l.crmka.net/angular_api/user/login',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {"LoginForm": user},
        })
            .then(resp => {
              const token = resp.data.data.access_token
              const username = user.username
              localStorage.setItem('token', token)
              localStorage.setItem('username', username)
              commit('auth_success', {
                token: token,
                username: username
              })
              resolve(resp)
            })
            .catch((err) => {
              commit('auth_error', err.message)
              localStorage.removeItem('token')
              reject(err.response.data.errors)
            })
      })
    },
    // role({commit}) {
    //   return new Promise((resolve, reject) => {
    //     commit('permissions_request')
    //     axios({
    //       url: 'http://back.w.crmka.net/wm_api/user/permission',
    //       method: 'get',
    //     }).then(resp => {
    //       commit('permissions_success', resp.data.data)
    //     }).catch(err => {
    //       commit('permissions_error')
    //       console.log(err)
    //       reject(err)
    //     })
    //   })
    // },
    // finance({commit}){
    //   return new Promise((resolve, reject) => {
    //     commit('finance_request')
    //     axios({
    //       url: 'http://back.w.crmka.net/wm_api/finance/balance',
    //       method: 'get',
    //     }).then(resp => {
    //       commit('finance_success', resp.data.data)
    //     }).catch(err => {
    //       commit('finance_error', err)
    //       console.log(err)
    //       reject(err)
    //     })
    //   })
    // },
    logout({commit}) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },

  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.auth_status,
    authError: state => state.auth_error,
    username: state => state.username,
  }
})