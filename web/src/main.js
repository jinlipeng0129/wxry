import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.config.productionTip = false
import './scss/style.scss'
import './assets/font-icon/iconfont.css'
import  Card from './views/Card.vue'
 Vue.component('m-card',Card)
import listcard from './views/list-card.vue'
Vue.component('list-card',listcard)
Vue.prototype.$http=axios.create({
    baseURL:'http://localhost:3000/web/api'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

