module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'itunes_search',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // metirial 디자인 아이콘 링크
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  // 플러그인은 루트 Vue.js 인스턴스가 초기화 되기 전에 실행
  // 외부 모듈 추가
  plugins: ['~plugins/vuetify.js'],
  // 링크 추가
  css: ['~assets/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    // 원래는 모듈을 임포트할떄마다 웹팩이 생성한 웹페이지 번들이 코드에 추가됨
    // vendor오ㅂ션을 추가하면 vendor 번들 파일이 딱 한번만 추가됨
    // nuxt 2.0 에는 vendor 옵션 불필요
    // vendor: ['axios', 'vuetify']

    // 저장시에 eslint
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}

