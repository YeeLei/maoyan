<template>
  <div class="loading">
    <!-- <img src="./loading.svg"
         width="30"
         height="30"> -->
    <span class="icon"></span>
    <p class="desc"
       v-html="title">
    </p>
  </div>
</template>

<script>
export default {
  name: 'm-loading',
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
.loading {
  margin-top: 5px;
  width: 100%;
  @include center();
  .icon {
    width: 20px;
    height: 20px;
    background: url("./loading.png") no-repeat;
    background-size: cover;
    animation: loader 1.2s linear;
    animation-iteration-count: infinite;
  }
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .desc {
    line-height: 20px;
    font-size: $xs-font;
    color: $gray-color;
    margin-left: 5px;
  }
}
</style>
