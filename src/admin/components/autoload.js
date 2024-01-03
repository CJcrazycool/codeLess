/**
 * 自动注册项目组件
 * 在此文件注册使用后，组件无需手动引入注册
 */

//配置自动导入的组件
const loadComponents = {
}

export default {
	install(Vue) {
		for (let key in loadComponents) {
			Vue.component(key, loadComponents[key])
		}
	}
}
