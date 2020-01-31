<template>
  <div id="e3" style="max-width: 400px; margin: auto;"
  class="grey lighten-3">
        <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card target="_blank" :href="url" :color="color" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">{{title}}</div>
                      <div>{{artistName}}</div>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-media
                    :src="image"
                    height="100px"
                    contain>
                  </v-card-media>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  // 속성 목록이 컴포넌트로 전달
  props: ['title', 'image', 'artistName', 'url', 'color'],
}
</script>