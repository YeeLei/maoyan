<template>
  <footer>
    <ul>
      <router-link v-for="item in list"
                   :key="item.title"
                   :to="item.path"
                   tag="li">
        <span class="iconfont"
              :class="item.icon"></span>
        <p>{{ item.title }}</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          title: '电影/影院',
          icon: 'icon-dianying',
          path: '/movies'
        },
        {
          title: '视频',
          icon: 'icon-shipin',
          path: '/video'
        },
        {
          title: '小视频',
          icon: 'icon-xiaoshipinyingshi48',
          path: '/mini-video'
        },
        {
          title: '演出',
          icon: 'icon-youhuiquan',
          path: '/show'
        },
        {
          title: '我的',
          icon: 'icon-wode',
          path: '/mine'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
footer {
  position: fixed;
  width: 100%;
  height: 50px;
  background: $white-color;
  border-top: 1px solid $border-color;
  bottom: 0;
  left: 0;
  font-size: $xs-font;

  ul {
    height: 100%;
    display: flex;

    li {
      flex: 1;
      flex-direction: column;
      @include center();
      color: #696969;
      transition: 0.3s linear;
      .iconfont {
        font-size: $xxl-font;
        &.icon-youhuiquan {
          font-size: 22px;
        }
      }

      p {
        margin-top: 3px;
      }
    }

    .router-link-active {
      color: $theme-color;
    }
  }
}
</style>
