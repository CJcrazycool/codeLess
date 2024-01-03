import {
	Boot
} from '@wangeditor/editor'
import {
	ImageMenu
} from './resourceMenu'

Boot.registerMenu({
	key: 'resource',
	factory() {
		return new ImageMenu()
	},
})
