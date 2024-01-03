import {get, post, put, del} from '@public/js/api'
import {strings} from '@public/js/util'

/**
 * 房型
 */
export default {
    queryById: (params) => get('/hotel/queryHotelRoom', params),
    edit: (params) => post('/hotel/updateHotelRoom', params),
    pageList: (params) => post('/hotel/queryHotelRoomPage', params),
    saveColumn: (params) => post('/hotel/batchSaveOrUpdateHotelRoomFacility', params),
    columnList: (params) => get('/hotel/queryHotelRoomFacilityList', params)
}
