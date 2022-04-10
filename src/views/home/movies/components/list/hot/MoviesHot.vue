<template>
  <div class="hot">
    <div class="loading-container"
         v-show="flag">
      <loading></loading>
    </div>
    <scroll :pullUpLoad="true"
            @pullingUp="pullingUp"
            ref="scroll">
      <div>
        <ListRated :data="listRated"
                   @imageLoad="imageLoad"
                   title="最受好评电影" />
        <ListMovies :data="listMovies"
                    :loading="loading"
                    @imageLoad="imageLoad"
                    ref="listmovie" />
      </div>
    </scroll>
  </div>
</template>

<script>
import ListRated from '../components/ListRated.vue'
import ListMovies from '../components/ListMovies.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import { getRatedApi, getMoviesApi, getMoreMoviesApi } from '@/service/api'
import Loading from '@/components/base/loading/loading.vue'
export default {
  data () {
    return {
      flag: false,
      listRated: [],
      listMovies: [],
      count: 0, // 总数据条数
      size: 6, // 每次下拉更新的数量
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
      this.flag = true
      setTimeout(async () => {
        const res1 = await getRatedApi()
        const res2 = await getMoviesApi()
        this.listRated = res1.result
        this.listMovies = res2.result
        this.ids = res2.ids
        this.startIndex = res2.result.length
        this.flag = false
      }, 1000)
    },
    // 下拉加载更多
    async pullingUp () {
      if (this.listMovies.length === this.ids.length) {
        // this.$refs.listmovie.$el.style.paddingBottom = 0
        this.loading = false
        // console.log('没有数据了')
        return
      }
      this.loading = true
      setTimeout(async () => { // 延迟加载1秒，提高用户体验
        const ids = this.ids.slice(this.startIndex, this.startIndex + this.size).join(',')
        const res = await getMoreMoviesApi({ ids })
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
    ListRated,
    ListMovies,
    Scroll,
    Loading
  }
}
</script>

<style lang="scss" scoped>
.hot {
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
