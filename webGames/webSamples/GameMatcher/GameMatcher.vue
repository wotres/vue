<template>
    <div v-if="currentGame ==='multiplication-table'">
        <iframe src="http://localhost:8080/webSamples/1_multiplicationTable/MultiplicationTable.html"></iframe>
    </div>
    <div v-else-if="currentGame ==='word-chain'">
        <iframe src="http://localhost:8080/webSamples/2_wordChain/wordChain.html"></iframe>
    </div>
    <div v-else-if="currentGame ==='number-baseball'">
        <number-baseball></number-baseball>
    </div>
    <div v-else-if="currentGame ==='response-check'">
        <response-check></response-check>
    </div>
    <div v-else-if="currentGame ==='rock-paper-scissors'">
        <rock-paper-scissors></rock-paper-scissors>
    </div>
    <div v-else-if="currentGame ==='lotto-generator'">
        <lotto-generator></lotto-generator>
    </div>
    <div v-else-if="currentGame ==='tic-tac-toe'">
        <tic-tac-toe></tic-tac-toe>
    </div>
    <div v-else-if="currentGame ==='tictactoe-eventbus'">
        <ticTacToe-eventBus></ticTacToe-eventBus>
    </div>
    <div v-else-if="currentGame ==='tictactoe-vuex'">
        <ticTacToe-vuex></ticTacToe-vuex>
    </div>
    <div v-else-if="currentGame ==='mine-search'">
        <mine-search></mine-search>
    </div>
    <div v-else>일치하는 게임이 없습니다.</div>
</template>
<script>
import NumberBaseball from '../3_numberBaseball/NumberBaseball';
import ResponseCheck from '../4_responseCheck/ResponseCheck';
import RockPaperScissors from '../5_rockPaperScissors/RockPaperScissors';
import LottoGenerator from '../6_lottoGenerator/LottoGenerator';
import TicTacToe from '../7_ticTacToe/TicTacToe';
import TicTacToeEventBus from '../7.1_ticTacToeEventBus/TicTacToeEventBus';
import TicTacToeVuex from '../7.2_ticTacToeVuex/TicTacToeVuex';
import MineSearch from '../8_mineSearch/MineSearch';
export default {
    components: {
        NumberBaseball,
        ResponseCheck,
        RockPaperScissors,
        LottoGenerator,
        TicTacToe,
        TicTacToeEventBus,
        TicTacToeVuex,
        MineSearch
    },
    mounted() {
        // router는 전체 route에 대한 설정들
        console.log(this.$router);
        // route는 현재 주소에 대한 설정
        console.log(this.$route);
    },
    computed: {
        currentGame() {
            return this.$route.params.name;
        }
    }
    
}
</script>