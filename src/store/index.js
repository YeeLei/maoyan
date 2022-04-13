import Vue from 'vue'
import Vuex from 'vuex'
import cityModule from './city/cityModule'
import detailModule from './detail/detailModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    city: cityModule,
    detail: detailModule
  }
})
