import Router from '@public/js/router'
import {accessAuth} from '../js/accessAuth'
import routes from './routes'
import store from '../store/'

class AdminRouter extends Router {
	store = store
	loginPath = '/login'
	accessAuth = accessAuth
}

var router = new AdminRouter({
	routes
})

export default router.instance
