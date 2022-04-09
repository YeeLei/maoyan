import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入重置样式
import './assets/scss/reset.scss'
import 'amfe-flexible'

// 引入字体图标的css
import './assets/font/iconfont.css'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
