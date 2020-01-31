import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/store'

// 예전 버젼
import VueFire from 'vuefire'
// 현재 버젼
// import { firestorePlugin } from 'vuefire'
import './firebase'
require('./assets/app.css')

// 플러그인 설정
Vue.use(VueFire)
// Vue.use(firestorePlugin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({ // vue 생성자
  el: '#app', // DOM 마운트 지점을 찾는데 사용할 CSS 선택자
  router,
  // store로 인스턴스 저장소 추가
  store, // es6 문법 -> 이전문법은 store: store
  components: { App },
  template: '<App/>'
})
