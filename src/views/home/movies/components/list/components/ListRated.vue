<template>
  <div class="top-rated"
       v-if="data.length > 0">
    <p class="title">{{title}}</p>
    <div class="wrapper">
      <scroll :scrollX="true">
        <div class="top-rated-list">
          <a class="top-rated-item"
             v-for="(item) in data"
             :key="item._id">
            <div class="poster">
              <img :src="item.imgUrl || item.img"
                   :alt="item.title"
                   @load="imageLoad" />
              <span class="wish-bg"></span>
              <span class="wish"
                    v-if="item.wishNum !== null">
                <span class="wish-num"
                      v-html="item.wishNum || item.wish"></span>人想看
              </span>
              <span class="score"
                    v-else>观众评分
                <span class="rated-score"
                      v-html="item.score">
                </span>
              </span>
            </div>
            <h5 class="name"
                v-html="item.title || item.nm">
            </h5>
            <div class="date"
                 v-if="item.comingTitle">
              {{formatDate(item.comingTitle)}}
            </div>
          </a>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '@/components/base/scroll/scroll.vue'
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    imageLoad () {
      this.$emit('imageLoad')
    },
    formatDate (val) {
      return val.split(' ')[0]
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
        font-size: $sm-font;
        color: #222;
        margin: 3px 0;
        @include no-wrap();
      }
      .date {
        font-size: $xxs-font;
        color: #999;
      }
    }
  }
}
</style>
