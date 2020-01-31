import { shallow, createLocalVue } from '@vue/test-utils'
import Header from '../src/components/Header.vue'
// 테스트시 전달받은 속성들이 오류나지않기 위해 아래와 같이 임포트 해줘야함
import Vuex from 'vuex'
import '../src/firebase'
// import {store} from '../src/store/store'

const locaVue = createLocalVue()
localVue.arguments(Vuex)
debugger;

// 값 테스트
describe('Header.vue', () => {
  // import 하지않고 선언하여 사용 
  // mock 생성 : 복잡한 객체와 구조와 동일한 객체
  let store
  let getters
  let mutations
  // 각 테스트가 실행하기 전 실행됨
  beforeEach(() => {
    getters = {
      session: () => false
    }
    mutations = {
      SET_SESSION: () => {}
    }
    // 모의 저장소
    store = new Vuex.Store({
      getters,
      mutations
    })
  })
  // 속성 제대로 전달되었는지 비교
  it ('헤더에 올바르게 속성이 전달되었는지 확인', () => {
    const cartItemCount = 10
    const wrapper = shallow(Header, {
      store, localVue, propsData: { cartItemCount }
    })
    //expect 는 속성 일치하는지 확인
    expect(wrapper.vm.cartItemCOunt).toBe(cartItemCount)
  })

  // 텍스트 비교
  it('cartItemCount 텍스트가 제대로 표시되는지 확인', () => {
    const cartItemCount = 10
    const wrapper = shallow(Header, {
      store, localVue, propsData: { cartItemCount }
    })
    const p = wrapper.find('span')
    expect(p.text()).toContain(cartItemCount)
  })

  // css 테스트
  it('navbar 클래스가 첫 번째 div에 추가되는지 확인', () => {
    const cartItemCount = 10
    const wrapper = shallow(Header, {
      store, localVue, propsData: { cartItemCount }
    })
    // div 중 첫 div 확인
    const p = wrapper.findAll('div').at(0)
    expect(p.classes()).toContain('navbar')
  })

  // 로그인 테스트
  it('로그인 버튼의 텍스트가 올바른지 확인', () => {
    const cartItemCount = 10;
    const wrapper = shallow(Header, {
      store, localVue, propsData: { cartItemCount }
    })

    expect(wrapper.findAll('button').at(0).text()).toBe("로그인")

  })

  // 로그아웃 테스트
  it('로그아웃 버튼의 텍스트가 올바른지 확인', () => {
    const cartItemCount = 10;
    getters.session = () => true;
    store = new Vuex.Store({ getters, mutations})
    const wrapper = shallow(Header, {
      store, localVue, propsData: { cartItemCount }
    })
    debugger;
    expect(wrapper.findAll('button').at(0).text()).toBe("로그아웃")
  })
})