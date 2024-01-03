<script>
	import selectHotelContent from './content/SelectHotelContent'
	import selectDialog from '@public/components/base/BaseSelectDialog'
	
	export default {
		mixins :[
			selectDialog
		],
		data(){
			return {
				title:'选择酒店',
				componentContent:selectHotelContent
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>