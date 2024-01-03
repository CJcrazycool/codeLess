import AccessAuth from '@public/js/accessAuth'
import adminStore from '@admin/store'
import accessAuthApi from '@admin/api/accessAuth'

class AdminAccessAuth extends AccessAuth {
	
	checkTokenApi = accessAuthApi.checkToken;
	store = adminStore
	
	getStorageName(name){
		return 'admin_'+name
	}
	
}

export var accessAuth = new AdminAccessAuth()
accessAuth.loadStorege()

export default {
	install(Vue) {
		Vue.prototype.$accessAuth = accessAuth
	}
}
