import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'

// vue로 vuex설정
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    products
  }
  // // 상품
  // state: {
  //   products: {}
  // },
  // // mutations는 동기적이여야 하고
  // // Vuex 내부의 액션만 비동기 코드를 받을 수 있음
  // // => 액션에서 axios 코드 추가 후 호출
  // mutations: {
  //   'SET_STORE' (state, products) { // set_store 함수
  //     state.products = products
  //   }
  // },
  // actions: {
  //   initStore: ({commit}) => { // mutation을 commit함
  //     // eslint-disable-next-line no-undef
  //     axios.get('/static/products.json')
  //       .then((response) => {
  //         console.log(response.data.products)
  //         commit('SET_STORE', response.data.products)
  //       })
  //   }
  // },
  // getters: {
  //   products: state => state.products
  // }
})
