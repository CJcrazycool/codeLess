/**
 * 自动注册公共组件
 * 在此文件注册使用后，公共组件无需手动引入注册
 */
import helpTip from './HelpTip'
import tableView from './TableView'
import treeView from './TreeView'
import treeMover from './TreeMover'
import paginationLoader from './PaginationLoader'
import selectResult from './SelectResult'
import copyText from './CopyText'
import pageFooter from './PageFooter'
import dropdownInput from './DropdownInput'
import thumbInfo from './ThumbInfo'
import dateRange from './DateRange'
import emptyText from './EmptyText'
import parentCascader from './ParentCascader'
import dictSelect from './DictSelect'
import qrCode from './QrCode'
import textContent from './TextContent'
import uploadFile from './UploadFile'
import uploadImage from './UploadImage'
import mapInput from './MapInput'
import tagList from './TagList'
import editor from './editor/Editor'
import imageZoneSelector from './ImageZoneSelector'
import pagePanelNavLayout from './PagePanelNavLayout'
import countDownButton from './CountDownButton'

//配置自动导入的组件
const loadComponents = {
	helpTip,
	tableView,
	treeView,
	treeMover,
	paginationLoader,
	selectResult,
	copyText,
	pageFooter,
	dropdownInput,
	thumbInfo,
	dateRange,
	emptyText,
	parentCascader,
	dictSelect,
	qrCode,
	textContent,
	uploadFile,
	mapInput,
	uploadImage,
	tagList,
	editor,
	imageZoneSelector,
	pagePanelNavLayout,
	countDownButton
}

export default {
	install(Vue) {
		for (let key in loadComponents) {
			Vue.component(key, loadComponents[key])
		}
	}
}
