// shallow 함수는 Vue 컴포넌트가 가진 자식 컴포넌트를 제외하고 렌더링
// 어설션(Assertion) : 개발시에 디버깅 해주면서 프로그램 배포시에는 컴파일 되지않게 할 수 있는 코드 
// import { shallow } from '@vue/test-utils'
// import Form from '../src/components/Form.vue'

// describe('Form.vue', () => {
//   it('버튼을 눌렀을 때 madeOrder가 true가 되는지 확인', () => {
//     const wrapper = shallow(Form) // Form 컴포넌트에 래퍼를 할당
//     wrapper.find('button').trigger('click') // 버튼 트리거
//     expect(wrapper.vm.madeOrder).toBe(true) // madeOrder true인지 확인
//   })
// })

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});