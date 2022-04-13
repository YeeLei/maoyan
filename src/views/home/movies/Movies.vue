<template>
  <div class="movies">
    <div class="top">
      <HomeHeader title="猫眼电影" />
      <HomeLogo />
    </div>
    <div class="list">
      <movies-nav />
      <transition :name="transitionName">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/views/home/components/header/HomeHeader'
import HomeLogo from '@/views/home/components/logo/HomeLogo'
import MoviesNav from '@/views/home/movies/components/nav/Nav'

export default {
  name: 'm-movie',
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    // 使用watch 监听$router的变化
    $route (to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  },
  components: {
    HomeHeader,
    HomeLogo,
    MoviesNav
  }
}

</script>
<style lang='scss' scoped>
.movies {
  .top {
    width: 100%;
  }
  .list {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 110px;
    overflow: hidden;
    .homelist {
      width: 100%;
      position: fixed;
      left: 0;
      top: 154px;
      bottom: 50px;
      overflow: hidden;
      .list-wrapper {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
