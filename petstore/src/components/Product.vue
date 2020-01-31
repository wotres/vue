<template>
  <div>
    <my-header></my-header>
    <!-- $route.params.id 를 통해 매개변수로 전달된 id값 표시 가능-->
    <h1>id {{$route.params.id}} 입니다.</h1>
    <div class="row" v-if="product">
      <div class="col-md-5 col-md-offset-0">
        <figure>
          <img class="product" v-bind:src="'/' + product.image" >
        </figure>
      </div>
      <div class="col-md-6 col-md-offset-0 description">
        <h1>{{product.title}}</h1>
        <p v-html="product.description"></p>
        <p class="price">{{product.price}}</p>
        <button @click="edit">상품 수정</button>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './Header.vue'
import { productsRef } from '../firebase';

export default {
  components: { MyHeader },
  firebase: {
    products: productsRef
  },
  data() {
    return {
      // product: ''
    }
  },
  computed: {
    product() {
      return this.products.filter(product => product.id === parseInt(this.$route.params.id)).shift();
    }
  },
  methods: {
    edit() {
      // edit경로를 활성화
      this.$router.push({name: 'Edit'})
    }
  },
  created: function() {
    // axios.get('/static/products.json')
    // .then((response) => {
    //   // 일치하는 데이터만 추가                                       
    //   this.product = response.data.products.filter(data => data.id == this.$route.params.id)[0];
    //   this.product.image = '/' + this.product.image;
    // });
  }
}
</script>