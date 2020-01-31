<template>
  <div>
    <h1>{{$route.params.id}}에 대한 결과</h1>
    <div v-if="albumData">
      <div v-for="(album, index) in albumData" :key="index">
          <Card :title="album.collectionCensoredName"
                :image="album.artworkUrl60"
                :artistName="album.artistName"
                :url="album.artistViewUrl"
                :color="picker(index)"/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Card from '~/components/Card.vue'
export default {
  // 미들 웨어를 사용하면 저장소에 저장한뒤 데이터에 접근하지만
  // 아래처럼 asyncData 를 이용하면 저장소에 저장하지않고 데이터를 가져와 미리 렌더링가능
  asyncData ({ params }) {
    return axios.get(`https://itunes.apple.com/search?term=${params.id}&entity=album`)
      .then((response) => {
          console.log(response.data.results);
          return {albumData: response.data.results}
      });
  },
  components: {
    Card
  },
  methods: {
    picker(index) {
        return index % 2 == 0 ? 'red' : 'blue'
    }
  },
  computed: {
    // albumData() {
    //   return this.$store.state.albums;
    // }
  },
  // middleware: 'search'
}
</script>