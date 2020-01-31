<template>
<header>
  <div class="navbar navbar-default">
    <div class="navbar-header">
      <!-- to로 지정된 경로에 연결 -->
      <h1><router-link :to="{name: 'iMain'}">{{ sitename }}</router-link></h1>
    </div>
    <div class="nav navbar-nav navbar-right cart">
      <div v-if="!mySession">
        <button type="button" class="btn btn-default btn-lg" v-on:click="signIn">
          로그인
        </button>
      </div>
      <div v-else>
        <button type="button" class="btn btn-default btn-lg" v-on:click="signOut">
          <img class="photo" :src="mySession.photoURL" />
          로그아웃
        </button>
      </div>
    </div>
    <div class="nav navbar-nav navbar-right cart">
      <!-- <button type="button" class="btn btn-default btn-lg" v-on:click="showCheckout">
        <span class="glyphicon glyphicon-shopping-cart">{{cartItemCount}}</span> 체크아웃
      </button> -->
      <!-- 활성화된 클래스 속성은 active클래스 추가할 것-->
      <router-link
          active-class="active"
          tag="button" class="btn btn-default btn-lg" :to="{name: 'Form'}">
        <span class="glyphicon glyphicon-shopping-cart">{{cartItemCount}}</span> 체크아웃
      </router-link>
    </div>
  </div>
</header>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Header',
  data() {
    return {
      sitename: "Vue.js 애완용품샵"
    }
  },
  props: ['cartItemCount'],
  beforeCreate() {
    // 로그인 / 로그아웃 시점 결정
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('SET_SESSION', user || false)
    })
  },
  methods: {
    // showCheckout() {
    //   this.$router.push({name: 'Form'});
    // }
    showCheckout() {
      this.$router.push({name: 'Form'});
    },
    signIn() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log('signed in!');
      }).catch(function(error){
        console.log('error ' + error)
      });
    },
    signOut() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("signed out!")
      }).catch(function(error) {
        console.log("error in sign out!")
        // An error happened.
      });
    }
  },
  computed: {
    mySession() {
      return this.$store.getters.session;
    }
  }
}
</script>

<!-- css 를 해당 컴포넌트에서만 사용하기 위해 scoped 속성 추가 -->
<style scoped>
a {
  text-decoration: none;
  color: black;
}
.photo {
  width: 25px;
  height: 25px;
}

.router-link-exact-active {
  /* color: blue; */
  color: black;
}
</style>
