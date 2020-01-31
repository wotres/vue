// 상품
const state = {
  products: {},
  session: false
}

const getters = {
  products: state => state.products,
  session: state => state.session
}

const actions = {
  initStore: ({commit}) => { // mutation을 commit함
    // eslint-disable-next-line no-undef
    axios.get('/static/products.json')
      .then((response) => {
        console.log(response.data.products)
        commit('SET_STORE', response.data.products)
      })
  }
}

// mutations는 동기적이여야 하고
// Vuex 내부의 액션만 비동기 코드를 받을 수 있음
// => 액션에서 axios 코드 추가 후 호출
const mutations = {
  'SET_STORE' (state, products) { // set_store 함수
    state.products = products
  },
  // 세션 정보 저장해서 앱 어디서든 사용할 수 ㅣㅇㅆ도록 함
  'SET_SESSION' (state, session) {
    state.session = session
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
