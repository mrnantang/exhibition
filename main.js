import Vue from 'vue'
import App from './App'


import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
import CON from './static/js/config.js'
Vue.prototype.CON=CON;

Vue.config.productionTip = false
import Reques from './static/js/Request.js'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.prototype.Reques=new Reques();
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
   