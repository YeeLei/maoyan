<template>
  <div class="wait">
    <div class="loading-container"
         v-show="flag">
      <loading></loading>
    </div>
    <scroll ref="scroll"
            :pullUpLoad="true"
            @pullingUp="pullingUp">
      <div>
        <list-rated :data="listRated"
                    @imageLoad="imageLoad"
                    title="近期最受期待" />
        <list-movies :data="listMovies"
                     :loading="loading"
                     ref="listmovie"
                     @imageLoad="imageLoad" />
      </div>
    </scroll>
  </div>
</template>

<script>
import { getWaitRatedApi, getWaitMoviesApi, getWaitMoreMoviesApi } from '@/service/api'
import Scroll from '@/components/base/scroll/scroll.vue'
import ListRated from '../components/ListRated.vue'
import ListMovies from '../components/ListMovies.vue'
import Loading from '@/components/base/loading/loading.vue'

export default {
  data () {
    return {
      flag: false,
      listRated: [],
      listMovies: [],
      count: 0, // 总数据条数
      size: 10, // 每次下拉更新的数量
      ids: [], // 所有电影的id的数组
      startIndex: 0, // 从第几项开始截取
      loading: false
    }
  },
  mounted () {
    this.showLoading()
  },
  methods: {
    showLoading () {
      setTimeout(() => {
        this.flag = true
      }, 300)
      setTimeout(async () => {
        const res1 = await getWaitRatedApi()
        const res2 = await getWaitMoviesApi()
        this.listRated = res1.coming
        this.listMovies = res2.coming
        this.ids = res2.movieIds
        this.startIndex = res2.coming.length
        this.flag = false
      }, 1000)
    },
    // 下拉加载更多
    async pullingUp () {
      if (this.listMovies.length === this.ids.length) {
        this.loading = false
        // console.log('没有数据了')
        return
      }
      this.loading = true
      setTimeout(async () => { // 延迟加载1秒，提高用户体验
        const ids = this.ids.slice(this.startIndex, this.startIndex + this.size).join(',')
        const res = await getWaitMoreMoviesApi({ ids })
        // 更新数据
        this.listMovies = [...this.listMovies, ...res.result]
        this.startIndex = this.listMovies.length
        await this.$nextTick()
        this.refresh()
        // 开启下一次下拉加载事件
        this.$refs.scroll.finishPullUp()
      }, 1000)
    },
    imageLoad () {
      this.debounce(this.refresh(), 200)
    },
    debounce (func, delay) {
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    refresh () {
      this.$refs.scroll.refresh()
    }
  },
  components: {
    Scroll,
    ListRated,
    ListMovies,
    Loading
  }
}

</script>
<style lang='scss' scoped>
.wait {
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
