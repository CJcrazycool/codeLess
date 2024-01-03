import accessAuthApi from '@shop/api/accessAuth'
import {request} from '@public/js/request'
import {Permission} from '@public/js/permission'
import routerPermissionConfig from '../router/permissionConfig'

class ShopPermission extends Permission{
	
	queryPermissionKeyApi = accessAuthApi.getPermissionKeyValue
	
	routeConfig = routerPermissionConfig
}

export var permission = new ShopPermission()
