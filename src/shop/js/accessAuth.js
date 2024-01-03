import AccessAuth from '@public/js/accessAuth'
import shopStore from '@shop/store'
import accessAuthApi from '@shop/api/accessAuth'

class ShopAccessAuth extends AccessAuth {
	checkTokenApi = accessAuthApi.checkToken;
	store = shopStore
	getStorageName(name) {
		return 'shop_' + name
	}
	loadStorege(){
		this.tenant = JSON.parse(localStorage.getItem(this.getStorageName('tenant')))
		super.loadStorege()
	}
	setLoginSession(loginInfo) {
		this.tenant = loginInfo.company
		localStorage[this.getStorageName('tenant')] = JSON.stringify(this.tenant)
		super.setLoginSession(loginInfo)
	}
	clear() {
		this.tenant = null
		localStorage.removeItem([this.getStorageName('tenant')])
		super.clear()
	}
}

export var accessAuth = new ShopAccessAuth()

export default {
	install(Vue) {
		Vue.prototype.$accessAuth = accessAuth
	}
}
