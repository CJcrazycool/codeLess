<template>
	<div>
		<qrCode src="http://res.gshis.net/jxd-res:070ltWMSl869vM3noJxijd">
			<template slot="desc">右键图片另存为下载</template>
		</qrCode>
		<div class="dialog-footer">
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			channel:{}
		},
		components:{
		},
		data() {
			return {}
		},
		computed: {
		},
		watch: {
		},
		created() {
		},
		methods: {
			download(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>