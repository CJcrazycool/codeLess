import {get,post,put,del} from '@public/js/api'

/**
 * 日志
 */
export default {

	sysLogPageList: (params) => post('/sys/log/sysLogPageList', params),
	getSysLog: (params) => get('/sys/log/getSysLog', params),
	
	interfaceLogPageList: (params) => post('/sys/log/interfaceLogPageList', params),
	getInterfaceLog: (params) => get('/sys/log/getInterfaceLog', params),

	sysExceptionLogPageList: (params) => post('/sys/log/sysExceptionLogPageList', params),
    getSysExceptionLog: (params) => get('/sys/log/getSysExceptionLog', params)
}
