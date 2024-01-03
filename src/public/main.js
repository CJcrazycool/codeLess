import Vue from 'vue'
//ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//动画css
import 'animate.css'
//扩展icon
import './fonts/iconfont.css'
//全局样式（覆盖原有样式）
import './styles/global.scss';
//公共样式
import './styles/common.scss';
//自动导入公共组件
import commonComponents from './components/autoload.js'
//请求类
import request from './js/request'
//自定义指令
import directive from './js/directive'
//工具类
import util from './js/util'
//进度条
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })
//富文本编辑器初始化
import './components/editor/init'

Vue.config.productionTip = false

//设置ElementuiUI默认参数
ElementUI.Form.props.labelPosition = {
	default: 'top'
}
ElementUI.Form.props.labelWidth = {
	default: 'auto'
}
ElementUI.Switch.props.activeColor = {
	default: '#13ce66'
}
ElementUI.Dialog.props.closeOnClickModal = {
	default: false
}
ElementUI.Drawer.props.wrapperClosable = {
	default: false
}

Vue.use(ElementUI)
Vue.use(commonComponents)
Vue.use(request)
Vue.use(directive)
Vue.use(util)

export default new Vue({
	beforeCreate() {
		//注入全局对象
		Vue.prototype.$eventBus = this
	}
})
