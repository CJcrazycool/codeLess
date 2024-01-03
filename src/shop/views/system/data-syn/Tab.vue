<template>
	<el-tabs v-model="value" :before-leave="beforeLeave" type="card">
		<el-tab-pane label="数据更新" name="update"></el-tab-pane>
		<el-tab-pane label="更新记录" name="record"></el-tab-pane>
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
				if (name == 'update')
					this.$router.replace('update')
				else if (name == 'record')
					this.$router.replace('record')
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>