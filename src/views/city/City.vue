<template>
  <div class="city">
    <scroll :probeType="probeType"
            @scroll="scroll">
      <div>
        <div class="local-city"
             ref="localCity">
          <div class="city-title">
            定位城市
          </div>
          <div class="city-list">
            <div class="location-city city-item">杭州</div>
          </div>
        </div>
        <div class="history-city"
             ref="historyCity">
          <div class="city-title">
            最近访问城市
          </div>
          <div class="city-list">
            <div class="city-item">杭州</div>
            <div class="city-item">深圳</div>
            <div class="city-item">上海</div>
            <div class="city-item">广州</div>
          </div>
        </div>
        <div v-for="(item,index) in cityList"
             :key="item.prefix"
             ref="listGroup">
          <div class="hot-city"
               ref="hotCity"
               v-if="index === 0">
            <div class="city-title">
              热门城市
            </div>
            <div class="city-list">
              <div class="city-item"
                   v-for="city in item.cities"
                   :key="city.cityId">{{city.name}}</div>
            </div>
          </div>
          <div class="letter-city"
               ref="letterCity"
               v-else>
            <div class="city-title">
              {{item.prefix.toUpperCase()}}
            </div>
            <ul class="city-letter-list">
              <li class="city-letter-item"
                  v-for="city in item.cities"
                  :key="city.cityId">{{city.name}}</li>
            </ul>
          </div>
        </div>
        <div class="list-fixed">
          <div class="fixed-title">A</div>
        </div>
      </div>
    </scroll>
    <div class="shortcut-list"
         v-show="shortcutList.length > 0">
      <ul>
        <li class="item"
            v-for="(item,index) in shortcutList"
            :key="item.prefix"
            :class="{'current': currentIndex === index}">
          {{ item.toUpperCase() }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getAreaList } from '@/service/api'
import scroll from '@/components/base/scroll/scroll.vue'
export default {
  components: { scroll },
  name: 'm-city',
  data () {
    return {
      cityList: [],
      currentIndex: 0,
      listHeight: [],
      probeType: 3,
      scrollY: 0
    }
  },
  computed: {
    shortcutList () {
      const newarr = ['定', '近']
      const arr = this.cityList.map((group, index) => {
        if (index === 0) {
          group.prefix = '热'
        }
        return group.prefix.substr(0, 1)
      })
      return newarr.concat(arr)
    }
  },
  async mounted () {
    const res = await getAreaList()
    this.cityList = res.result
    // 计算楼层高度
    this.$nextTick(() => {
      this.calculateHight()
    })
  },
  methods: {
    scroll (pos) {
      // 获取Y轴方向上的滚动距离
      this.scrollY = pos.y
    },
    // 计算每一层列表的高度.并保存到this.listHeight
    calculateHight () {
      // 获取所有的列表层
      const list = this.$refs.listGroup
      console.log(this.$refs.listGroup)
      let height = 0
      // 默认第一层高度为0
      this.listHeight.push(height)
      this.listHeight.push(this.$refs.historyCity.clientHeight)
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  }
}

</script>
<style lang='scss' scoped>
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
.city {
  position: fixed;
  background-color: #ebebeb;
  font-size: $s-font;
  color: #333;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  .city-title,
  .fixed-title {
    padding-left: 15px;
    line-height: 30px;
  }
  .city-list {
    background-color: #f5f5f5;
    padding-bottom: 8px;
    overflow: hidden;
    .location-city {
      width: auto;
      min-width: 30%;
    }
    .city-item {
      width: 28%;
      padding: 0 20px;
      float: left;
      background: $white-color;
      height: 33px;
      margin-top: 15px;
      margin-left: 4%;
      padding: 0 4px;
      border: 1px solid #e6e6e6;
      border-radius: 3px;
      line-height: 33px;
      text-align: center;
      @include no-wrap();
    }
  }
  .letter-city {
    .city-letter-list {
      padding: 0 15px;
      background: #f5f5f5;
      .city-letter-item {
        width: 100%;
        height: 44px;
        line-height: 44px;
        border-bottom: 1px solid #c8c7cc;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
  .shortcut-list {
    position: fixed;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 15px 0;
    border-radius: 10px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    .item {
      padding: 3px;
      color: rgba(255, 255, 255, 0.8);
      font-size: $sm-font;
      &.current {
        color: $theme-color;
      }
    }
  }
}
</style>
