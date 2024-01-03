<template>
	<el-tabs v-model="value" :before-leave="beforeLeave" type="card">
		<el-tab-pane label="操作日志" name="operate"></el-tab-pane>
		<el-tab-pane label="接口日志" name="api"></el-tab-pane>
		<el-tab-pane label="异常日志" name="exception"></el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		props:{
			value:{}
		},
		data() {
			return {}
		},
		methods:{
			beforeLeave(name){
				if (name == 'operate')
					this.$router.replace('./operate')
				else if (name == 'api')
					this.$router.replace('./api')
				else if (name == 'exception')
					this.$router.replace('./exception')
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>