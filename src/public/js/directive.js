/**
 * 自定义指令
 */
import {getImageResourceUrl} from './util'

export default {
	install(Vue) {
		//通过v-img-src指令就可以自动将短url转化为可访问url
		Vue.directive('imgSrc', {
			bind: function(el, binding) {
				el.src = getImageResourceUrl(binding.value);
			},
			update: function(el, binding) {
				el.src = getImageResourceUrl(binding.value);
			}
		})
		
		//通过v-permission检查权限
		Vue.directive('permission', {
			inserted: function(el, binding, vnode) {
				var options = {}
				if(typeof(binding.value) == 'string'){
					options.code = binding.value
				}else(
					options = binding.value
				)
				//根据权限标识进行验证
				if(options.code)
					if(!Vue.prototype.$permission.check(options.code))
						el.remove()
				//根据路由path进行验证
				if(options.path)
					if(!Vue.prototype.$permission.checkByPath(options.path))
						el.remove()
			}
		})
	}
}
