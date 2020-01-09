const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    // 개발시에는 eval 모드로 하여 빌드 속도를 향상시킨다.
    // 운영할때는 hidden-sorce-map 모드로 실행한다.
    devtool: 'eval',
    resolve: {
        // 확장자 처리할수있는 파일 리스트
        // 아래 리스트를 추가하면 require 할 때 확장자명 없이 사용 가능
        extensions: ['.js', '.vue']
    },
    // 시작 하는 파일 위치
    entry: {
        numberBaseball: path.join(__dirname, '/webSamples/3_numberBaseball/index.js'),
        responseCheck: path.join(__dirname, '/webSamples/4_responseCheck/index.js'),
        rockPaperScissors: path.join(__dirname, '/webSamples/5_rockPaperScissors/index.js'),
        lottoGenerator: path.join(__dirname, '/webSamples/6_lottoGenerator/index.js'),
        ticTacToe: path.join(__dirname, '/webSamples/7_ticTacToe/index.js'),
        ticTacToeEventBus: path.join(__dirname, '/webSamples/7.1_ticTacToeEventBus/index.js'),
        ticTacToeVuex: path.join(__dirname, '/webSamples/7.2_ticTacToeVuex/index.js'),
        mineSearch: path.join(__dirname, '/webSamples/8_mineSearch/index.js'),
        gameMatcher: path.join(__dirname, '/webSamples/GameMatcher/index.js')
    },
    module: {
        // 자바스크립트가 아닌 확장자를 처리하는 모듈들과 연결 시켜준다.
        rules: [{
            test:/\.vue$/,
            loader:'vue-loader',
        }, {
            test:/\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        }]

    },
    plugins: [
        new VueLoaderPlugin()
    ],
    // 최종 아웃풋
    output: {
        // 합치는 파일 명 [name] 으로 하면 entry 의 선언된 이름을 사용
        filename: '[name].js',
        path: path.join(__dirname, 'build'),
        // web-pack-dev server일때는 아래 publicPath: 추가해줘야 파일 경로 제대로 인식
        publicPath: "/build"
    }
}