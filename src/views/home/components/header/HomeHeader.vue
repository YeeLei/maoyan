<template>
  <header>
    <span>{{ title }}</span>
    <span class="iconfont icon-ego-caidan"></span>
  </header>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
header {
  width: 100%;
  height: 50px;
  background: $theme-color;
  color: $white-color;
  @include center();
  font-size: $l-font;
  position: relative;

  .iconfont {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: $xxl-font;
  }
}
</style>
