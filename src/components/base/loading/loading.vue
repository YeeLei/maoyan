<template>
  <div class="loading">
    <img src="./loading.svg"
         width="30"
         height="30">
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
  width: 100%;
  @include center();
  .desc {
    line-height: 20px;
    font-size: $xs-font;
    color: $gray-color;
  }
}
</style>
