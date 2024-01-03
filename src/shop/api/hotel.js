import {get, post, put, del} from '@public/js/api'
import {strings} from '@public/js/util'

/**
 * 酒店
 */
export default {
    pageList: (params) => post('/hotel/queryHotelPage', params),
    list: (params) => get('/hotel/queryHotelList', params),
    queryById: (params) => get('/hotel/queryHotel', params),
    edit: (params) => post('/hotel/updateHotel', params),
    photoList: (params) => get('/hotel/queryHotelPhotoAlbumList', params),
    savePhoto: (params) => post('/hotel/renewalBatchHotelPhotoAlbum', params),
    queryHotelList: (params) => get('/hotel/queryHotelList', params)
}
