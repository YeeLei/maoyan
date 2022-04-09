<template>
  <div class="page">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <HomeFooter />
  </div>
</template>

<script>
import HomeFooter from '@/views/home/components/footer/HomeFooter'
export default {
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
    HomeFooter
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
}
</style>
