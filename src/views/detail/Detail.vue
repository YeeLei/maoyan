<template>
  <div class="movie-detail">详情页面<a href="#"
       @click="back">fanhu</a></div>
</template>

<script>
export default {
  name: 'm-detail',
  data () {
    return {
      index: 0
    }
  },
  created () {
    this.index = 1
  },
  mounted () {
    console.log(this.$route)
  },
  methods: {
    back () {
      if (this.index === 1) {
        this.$router.go(-1)
      }
      this.$router.back()
    }
  }
}

</script>
<style lang='scss' scoped>
.movie-detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #000;
}
</style>
