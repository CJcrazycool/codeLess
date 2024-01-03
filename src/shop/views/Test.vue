<template>
	<div class="page-panel page-panel-body">
		<uploadImage ref="file" value-formatter="json" v-model="test"></uploadImage>
		<el-button @click="ok">ok</el-button>
	</div>
</template>

<script>
	export default { 
		components: {
		},
		data() {
			return {
				loading:false,
				file:'',
				// test:[
				// 	'http://res.gshis.net/jxd-res:0XZaCELmhdmEhVab2OBQ_R?imageMogr2/thumbnail/300',
				// 	'http://res.gshis.net/jxd-res:2cPEx02bR2f8MVs7_wUAeA?imageMogr2/thumbnail/300'
				// ],
				test:'["http://res.gshis.net/jxd-res:0XZaCELmhdmEhVab2OBQ_R?imageMogr2/thumbnail/300"]',
				uploadFileList:[]
			}
		},
		watch: {
		},
		computed: {},
		created() {
			// setTimeout(()=>{
			// 	this.test.push('http://res.gshis.net/jxd-res:2cPEx02bR2f8MVs7_wUAeA?imageMogr2/thumbnail/300')
			// },3000)
		},
		mounted() {
		},
		methods: {
			async ok(){
				await this.$refs.file.submit()
				console.log(this.test)
				return
				await this.$refs.image.submit()
				console.log(this.test)
				console.log(this.uploadFileList)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
