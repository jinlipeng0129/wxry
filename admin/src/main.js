import Vue from 'vue'
import  Vuex from 'vuex'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
Vue.config.productionTip = false
Vue.use(Vuex)
import  http from './http'
Vue.prototype.$http=http

Vue.mixin(
    {
      methods:{
        getAuthorization()
        {
          return{
            Authorization:'Bearer '+ localStorage.token || ''
          }
        }

      }
    }
)

const store= new Vuex.Store({
   state:{
       userName:''
   },
    mutations:{
        setUser(state, flag) {
            state.userName = flag
            localStorage.setItem('userName', state.userName);
        },
        setUserName(state, flag) {
            state.userName = flag;
        }
    }
})

new Vue({
    router,
    store,
  render: h => h(App)
}).$mount('#app')
