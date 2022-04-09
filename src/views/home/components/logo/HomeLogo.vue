<template>
  <div class="logo">
    <!-- 绝对路径（在线链接的方式是可以的） -->
    <!-- 相对路径直接写在src属性里面也是可以的 -->
    <img :src="imgUrl"
         alt="" />
    <!-- 如果相对路径的情况下，使用data响应式数据，不能直接显示 -->
    <!-- 需要使用import或者require的方式引入图片 -->
    <div class="right">
      <a href="#"
         class="text">发现最新最热电影</a>
      <span class="split"></span>
      <a href="#"
         class="open-app">打开App<i class="iconfont icon-youjiantou"></i></a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgUrl: require('../../../../assets/images/logo.png')
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
.logo {
  width: 100%;
  height: 60px;
  @include border-bottom-1px($border-color);
  background: $white-color;
  @include center();
  justify-content: space-around;
  img {
    width: 94px;
    height: 39px;
    margin-left: 10px;
  }
  .right {
    flex: 1;
    @include center();
    justify-content: flex-end;
    margin-right: 15px;
    .text {
      font-size: $s-font;
      color: $gray-color;
      font-weight: bold;
    }
    .split {
      width: 2px;
      height: 26px;
      margin: 0 5px;
      background: rgba(0, 0, 0, 0.1);
      transform: scale(0.5);
    }
    .open-app {
      @include center();
      font-size: $ms-font;
      color: #b37e7e;
      font-weight: bold;
    }
  }
}
</style>
