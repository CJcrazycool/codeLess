<template>
	<el-tabs class="inner-page-tab" v-model="value" :before-leave="beforeLeave" type="card">
		<!-- <el-tab-pane label="微信公众号/小程序" name="wx"></el-tab-pane> -->
		<el-tab-pane label="直连接口" name="apiConfig"></el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		props:{
			value:{}
		},
		data() {
			return {
			}
		},
		methods:{
			beforeLeave(name){
				if (name == 'wx')
					this.$router.replace({
						path:'/tenant/tenant/env',
						query:this.$route.query
					})
				else if (name == 'apiConfig')
					this.$router.replace({
						path:'/tenant/tenant/api-config',
						query:this.$route.query
					})
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>