<script>
	import selectPageContent from './content/SelectPageContent'
	import selectDialog from '@public/components/base/BaseSelectDialog'
	
	export default {
		props:{
			width:{
				default:()=>{
					return '1300px'
				}
			}
		},
		mixins :[
			selectDialog
		],
		data(){
			return {
				title:'选择微页面',
				componentContent:selectPageContent
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>