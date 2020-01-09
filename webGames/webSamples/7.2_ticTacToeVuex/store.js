import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // this.$store (미들웨어와 비슷한 역할을 한다.)

// 변수로 선언하여 잘못 입력하는 오류 방지
// const 는 이름 변경 불가
// import {SET_WINNER} from './store';
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

// default 로 설정 한 것은 const 와는 달리 이름 변경 가능
// import store from './store'
export default new Vuex.Store({
    // vue의 data 처럼 사용
    state: {
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner: '',
    },
    // vue의 computed 처럼 스테이트를 조작 가능 
    getters: {
        turnMessage(state) {
            return state.turn + '님의 승리'
        }
    },
    // state를 수정할 때 사용 (동기적으로 작용)
    mutations: {
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell }) {
            Vue.set(state.tableData[row], cell, state.turn);
        },
        [CHANGE_TURN](state){
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state){
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],            
            ];
        },
        [NO_WINNER](state){
            state.winner = '무승부';
        }
    },
    // state를 수정할때 사용 (비동기적으로 작용)
    // 또는 여러 뮤테이션을 연달아 실행시 사용
    actions: {}
})
