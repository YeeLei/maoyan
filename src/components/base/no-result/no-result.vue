<template>
  <div class="no-result">
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
      default: '没有数据了，到底啦~'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
.no-result {
  width: 100%;
  @include center();
  .desc {
    line-height: 20px;
    font-size: $xs-font;
    color: $gray-color;
  }
}
</style>
