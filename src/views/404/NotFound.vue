<template>
  <div class="not-found">
    <home-logo />
    <div class="body">
      <img src="./notfound.png"
           alt="">
      <div class="milu">（T ^ T）抱歉，迷路了' </div>
      <div><a href="/">返回首页</a></div>
    </div>

  </div>
</template>

<script>
import HomeLogo from '../home/components/logo/HomeLogo.vue'
export default {
  name: 'm-not-found',
  data () {
    return {
    }
  },
  components: {
    HomeLogo
  }
}

</script>

<style lang='scss' scoped>
@import "@/assets/scss/var.scss";
.not-found {
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  .body {
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translateX(-50%);
    font-size: $m-font;
    img {
      width: 200px;
    }
    .milu {
      margin: 10px 0;
    }
    a {
      color: $gray-color;
    }
  }
}
</style>
