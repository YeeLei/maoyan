<template>
  <div class="hot">
    <scroll :pullUpLoad="true"
            @pullingUp="pullingUp"
            ref="scroll">
      <div>
        <ListRated />
        <ListMovies ref="listmovies"
                    @refresh="refresh" />
      </div>
    </scroll>
  </div>
</template>

<script>
import ListRated from './ListRated.vue'
import ListMovies from './ListMovies.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
export default {
  methods: {
    // 下拉加载更多
    pullingUp () {
      this.$refs.listmovies.loadMore()
    },
    refresh () {
      this.$refs.scroll.refresh()
      // 开启下一次下拉加载事件
      this.$refs.scroll.finishPullUp()
    }
  },
  components: {
    ListRated,
    ListMovies,
    Scroll
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
}
</style>
