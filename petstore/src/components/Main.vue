<template>
<div>
  <my-header :cartItemCount="cartItemCount"></my-header>
  <main>
    <!-- for 문에 정렬된 함수 호출 가능-->
    <div v-for="product in sortedProducts" :key="product.id">
      <div class="row">
        <!-- offset없이 열 너비를 5로 맞춤 -->
        <div class="col-md-5 col-md-offset-0">
          <figure>
            <img class="product" v-bind:src="product.image">
          </figure>
        </div>
        <div class="col-md-6 col-md-offset-0 description">
          <!-- h1태그로 보이게 함 / Id 이름의 경로로 이동 -->
          <router-link tag="h1" :to="{name: 'Id', params: {id: product.id}}">
            {{product.title}}
          </router-link>
          <!-- html로 렌더링 -> 하지만 크로스 사이트 스크립트 공격에 취약 조심 -->
          <p v-html="product.description"></p>
          <p class="price">
            {{product.price | formatPrice}}
          </p>
          <button class="btn btn-primary btn-lg"
            v-on:click="addToCart(product)"
            v-if="canAddToCart(product)">장바구니 담기</button>
          <button disabled="true" class="btn btn-primary btn-lg"
            v-else>장바구니 담기</button>
          <transition name="bounce" mode="out-in">
            <span class="inventory-message"
                    v-if="product.availableInventory - cartCount(product.id) === 0" key="0">
                품절!
            </span>
            <span class="inventory-message"
                    v-else-if="product.availableInventory - cartCount(product.id) < 5" key="">
                {{product.availableInventory - cartCount(product.id)}} 남았습니다!
            </span>
            <span class="inventory-message"
                    v-else>지금 구매하세요!
            </span>
          </transition>
          <div class="rating">
            <span v-bind:class="{'rating-active': checkRating(n, product)}"
                v-for="n in 5" :key="n">☆
            </span>
          </div>
        </div>
      </div><!-- end of row -->
      <hr /><!-- 가로 규칙 태그 추가-->
    </div><!-- end of v-for -->
  </main>
</div><!-- end of showProduct -->
</template>

<script>
import MyHeader from './Header.vue';
import {mapGetters} from 'vuex'; // 계산된 속성을 입력할 필요없이 간단하게 사용할수 있게 하는 헬퍼
import { productsRef } from '../firebase'
// import { db } from '../firebase'

export default {
  name: 'imain',
  firebase: {
    products: productsRef
  },
  // firestore: {
  //   products: db.collection('products')
  // },
  data() {
    return {
      // store에서 관리
      // products: [],
      cart: []
    }
  },
  components: { MyHeader },
  methods: {
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    addToCart(aProduct) {
      this.cart.push(aProduct.id);
    },
    canAddToCart(aProduct) {
      return aProduct.availableInventory > this.cartCount(aProduct.id);
    },
    cartCount(id) {
      let count = 0;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    }
  },
  // computed는 beforeUpdate() 전에 이뤄짐
  computed: {
    // es6 스프레드 연산자
    ...mapGetters([
      // 'products',
      // 상품이 아닌 session만 가져오도록 업데이트
      'session'
    ]),
    cartItemCount() {
      return this.cart.length || '';
    },
    sortedProducts() {
      // console.log('?')
      // console.log(this.products)
      if (this.products.length > 0) {
        // slice를 사용해 객체를 배열로 반환
        let productsArray = this.products.slice(0);
        function compare(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase())
            return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase())
            return 1;
          return 0;
        }
        return productsArray.sort(compare);
      }
    }
    // store에서 값을 가져옴
    // products() {
    //   return this.$store.getters.products;
    // }
  },
  // 값을 받아 형식화를 수행하고 형식화된 값을 출력
  filters: {
    // 가격 값을 형식화
    formatPrice(price) {
      // 정수 아니면 반환
      if (!parseInt(price)) {
        return '';
      }
      if (price > 99999) {
        // 값을 소수 2자리수까지
        var priceString = (price / 100).toFixed(2);
        var priceArray = priceString.split("").reverse();
        var index = 3;
        // 세자리마다 쉼표
        while (priceArray.length > index + 3) {
          priceArray.splice(index+3, 0, ',');
          index += 4;
        }
        return '$' + priceArray.reverse().join('');
      } else { 
        return '$' + (price / 100).toFixed(2);
      }
    }
  },
  // watch: {
  //   cartItemCount: function(){
  //     console.log(this.cart.length);
  //   }  
  // },
  created: function() { 
    // this.$bind('products', db.collection('products')).then(products => {
    //   this.products === products
    //   // todos are ready to be used
    //   // if it contained any reference to other document or collection, the
    //   // promise will wait for those references to be fetched as well
 
    //   // you can unbind a property anytime you want
    //   // this will be done automatically when the component is destroyed
    //   this.$unbind('products')
    // })

    this.$store.dispatch('initStore')
    // 생명주기 훅에 Axios를 사용하여 인스턴스가 생성된 후 데이터를 불러옴
    // Axios는 웹브라우저와 Node.js 를 위한 약속 기반은 HTTP 클라이언트                
    // axios.get('/static/products.json').then(response => {
    //   this.products = response.data.products;
    //   console.log(this.products);
    // });
  },
  beforeUpdate: function () {
    // console.log('업데이트');
  }
}
</script>
<style scoped>
.bounce-enter-active {
  animation: shake 0.72s cubic-bezier(.37, .07, .19, .97) both;
  transform: translate3d(0,0,0);
  backface-visibility: hidden;
}

@keyframes shake {
  10%, 90% {
    color: red;
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    color: red;
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0)
  }
}
</style>