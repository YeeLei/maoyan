<template>
  <nav>
    <span class="city"
          @click="selectCity">杭州 <i class="citt-arrow"></i></span>
    <ul ref="ul">
      <router-link v-for="(item) in list"
                   :key="item.title"
                   :to="item.path"
                   tag="li"
                   @click.native="handleNavClick"
                   ref="li">
        {{ item.title }}
      </router-link>
    </ul>
    <span class="line"
          ref="line">
    </span>
    <span class="iconfont icon-fangdajing"></span>
  </nav>
</template>

<script>
export default {
  name: 'm-nav',
  data () {
    return {
      currentIndex: 0,
      list: [
        {
          title: '热映',
          path: '/hot'
        },
        {
          title: '影院',
          path: '/cinema'
        },
        {
          title: '待映',
          path: '/wait'
        },
        {
          title: '经典电影',
          path: '/classic'
        }
      ],
      activeTitle: '热映'
    }
  },
  mounted () {
    this.list.forEach((item, index) => {
      if (this.$route.path === item.path) {
        this.currentIndex = index
      }
    })
    const el = this.$refs.li[this.currentIndex].$el
    this.$refs.line.style.left = 62 + el.offsetLeft + (el.offsetWidth / 2) + 'px'
  },
  methods: {
    handleNavClick (el) {
      this.$refs.line.style.left = 62 + el.srcElement.offsetLeft + (el.srcElement.offsetWidth / 2) + 'px'
    },
    selectCity () {
      this.$router.push({
        path: '/city'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
nav {
  top: 110px;
  width: 100%;
  height: 44px;
  background: $white-color;
  @include border-bottom-1px($border-color);
  position: fixed;
  display: flex;
  font-size: $s-font;

  .city {
    width: 62px;
    margin-left: 10px;
    @include center();
    .citt-arrow {
      width: 0;
      height: 0;
      border: 4px solid transparent;
      border-top-color: #b0b0b0;
      display: inline-block;
      margin: 5px 5px 0 4px;
    }
  }

  .iconfont {
    width: 45px;
    @include center();
    color: $theme-color;
    font-size: $xxl-font;
    font-weight: bold;
  }

  ul {
    position: relative;
    flex: 1;
    align-self: center;
    padding-left: 20px;
    li {
      float: left;
      width: 50px;
      line-height: 40px;
      height: 100%;
      text-align: center;
      font-weight: 700;
      color: $gray-color;
    }
    li:last-child {
      width: 80px;
    }
    .router-link-active {
      font-size: $m-font;
      color: #333;
      position: relative;
    }
  }
  .line {
    position: absolute;
    width: 20px;
    height: 3px;
    background: $theme-color;
    bottom: 5px;
    border-radius: 1.5px;
    transition: all 0.2s;
  }
}
</style>
