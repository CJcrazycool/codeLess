import main from '@public/main'

import Vue from 'vue'
import App from './App.vue'
//路由配置
import router from './router/'
//Vuex配置
import store from './store/'
//项目基础样式
import './styles/base.scss';
//自动导入项目组件
import baseComponents from './components/autoload.js'
//登录认证
import accessAuth from './js/accessAuth'
//组件环境
import './components/env.js'

Vue.use(baseComponents)
Vue.use(accessAuth)


export default new Vue({
	mixins:[main],
	render: h => h(App),
	router,
	store,
}).$mount('#app')
