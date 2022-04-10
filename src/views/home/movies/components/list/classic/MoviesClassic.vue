<template>
  <div class="classic">
    <div class="loading-container"
         v-show="flag">
      <loading></loading>
    </div>
    <scroll ref="scroll">
      <div>
        <list-movies :data="listMovies"
                     ref="listmovie" />
      </div>
    </scroll>
  </div>
</template>

<script>
import { getClassicMoviesApi } from '@/service/api'
import Scroll from '@/components/base/scroll/scroll.vue'
import ListMovies from '../components/ListMovies.vue'
import Loading from '@/components/base/loading/loading.vue'

export default {
  data () {
    return {
      flag: false,
      listMovies: []
    }
  },
  mounted () {
    this.showLoading()
  },
  methods: {
    showLoading () {
      this.flag = true
      setTimeout(async () => {
        const res = await getClassicMoviesApi()
        this.listMovies = res.classicMovies.list
        this.flag = false
      }, 1000)
    }
  },
  components: {
    Scroll,
    ListMovies,
    Loading
  }
}

</script>
<style lang='scss' scoped>
.classic {
  width: 100%;
  position: fixed;
  left: 0;
  top: 154px;
  bottom: 50px;
  overflow: hidden;
  .loading-container {
    margin-top: 10px;
  }
}
</style>
