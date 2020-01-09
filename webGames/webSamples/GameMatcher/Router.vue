<template>
    <div>
        <div class="main">
            <a href="http://localhost:8080/webSamples/GameMatcher/Router.html">GameMatcher</a>
            <div>
                <router-link to="/game/multiplication-table">1_구구단</router-link>
                <router-link to="/game/word-chain">2_끝말잇기</router-link>
                <router-link to="/game/number-baseball">3_숫자야구</router-link>
            </div>
            <div>
                <router-link to="/game/response-check">4_반응속도 테스트</router-link>
                <router-link to="/game/rock-paper-scissors">5_가위바위보</router-link>
                <router-link to="/game/lotto-generator">6_로또 볼</router-link>
            </div>
            <div>
                <router-link to="/game/tic-tac-toe">7_틱택토</router-link>
                <router-link to="/game/tictactoe-eventbus">7.1_틱택토 이벤트 버스</router-link>
                <router-link to="/game/tictactoe-vuex">7.2_틱택토Vuex</router-link>
            </div>
            <div>
                <router-link to="/game/mine-search">8_지뢰찾기</router-link>
            </div>
            <div class="viewer">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import router from './routes';
    export default {
        router
    }
    window.onload = function() {
        console.log(location)
    }
    //  const path = $(location).attr('pathname').split('/')[1]

</script>
<style>
    .main {
        display: flex;
        flex-direction: column;
        width: 600px;
    }
    .main > a{
        text-align: center;
        font-size: 50px;
        text-decoration:none;
        color: darkblue;
    }
    .main > div {
        display: flex;
        justify-content: space-around;
    }
    .main > div > a{
        width: 33%;
        text-align: center;
        margin-top: 10px;
        text-decoration:none;
        color: darkslateblue;
    }
    .main .viewer {
        margin-top: 20px;
        text-align: center;        
    }
    .selected {
        font-weight: 1000px;
    }
</style>
