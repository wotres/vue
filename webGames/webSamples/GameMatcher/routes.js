import Vue from 'vue';
import VueRouter from 'vue-router';
// import NumberBaseball from '../3_numberBaseball/NumberBaseball';
import GameMatcher from './GameMatcher';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        // { path: '/game/number-baseball', component: NumberBaseball },
        // 위와 같은 식으로 주소 입력할 수도 있지만 동적 라우팅으로 연결가능
        // 대신 GameMatcher 파일에서 if 를 통해 연결
        { path: '/game/:name', component: GameMatcher }
    ]
})