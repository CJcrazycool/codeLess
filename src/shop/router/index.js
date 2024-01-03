import Router from '@public/js/router'
import {accessAuth} from '../js/accessAuth'
import routes from './routes'
import {permission} from '../js/permission'
import store from '../store/'

class ShopRouter extends Router {
	store = store
	loginPath = '/login'
	accessAuth = accessAuth
	permission = permission
}

var router = new ShopRouter({
	routes
})

export default router.instance
