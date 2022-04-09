<template>
  <div class="top-rated">
    <p class="title">最受好评电影</p>
    <div class="wrapper">
      <scroll :scrollX="true">
        <div class="top-rated-list">
          <a href="#"
             class="top-rated-item"
             v-for="(item) in list"
             :key="item._id">
            <div class="poster">
              <img :src="item.imgUrl"
                   :alt="item.title" />
              <span class="wish-bg"></span>
              <span class="wish"
                    v-if="item.wishNum !== null">
                <span class="wish-num"
                      v-html="item.wishNum"></span>
                人想看
              </span>
              <span class="score"
                    v-else>观众评分
                <span class="rated-score"
                      v-html="item.score"></span></span>
            </div>
            <h5 class="name"
                v-html="item.title">
            </h5>
          </a>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import { getRatedApi } from '@/service/api'
import Scroll from '@/components/base/scroll/scroll.vue'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getRatedList()
  },
  methods: {
    async getRatedList () {
      const res = await getRatedApi()
      this.list = res.result
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
.top-rated {
  padding: 12px 15px;
  background-color: $white-color;
  margin-bottom: 10px;
  .title {
    font-size: $s-font;
    color: #333;
    margin: 0 0 12px;
  }
  .wrapper {
    overflow: hidden;
  }
  .top-rated-list {
    display: inline-block;
    white-space: nowrap;
    .top-rated-item {
      display: inline-block;
      width: 85px;
      overflow: hidden;
      margin-right: 10px;
      .poster {
        width: 85px;
        height: 115px;
        position: relative;
        margin-bottom: 6px;
        img {
          width: 100%;
          height: 100%;
        }
        .wish-bg {
          display: inline-block;
          width: 100%;
          height: 35px;
          position: absolute;
          left: 0;
          bottom: 0;
          background-image: linear-gradient(-180deg, rgba(77, 77, 77, 0), #000);
        }
        .wish {
          position: absolute;
          left: 4px;
          bottom: 2px;
          color: #faaf00;
          font-size: $xxs-font;
          font-weight: 600;
        }
        .score {
          position: absolute;
          left: 4px;
          bottom: 2px;
          color: #faaf00;
          font-size: $xxs-font;
          font-weight: 600;
        }
      }
      .name {
        font-size: 13px;
        color: #222;
        margin: 0 0 3px;
        @include no-wrap();
      }
    }
  }
}
</style>
