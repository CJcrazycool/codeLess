<template>
	<el-tabs v-model="value" :before-leave="beforeLeave" type="card">
		<el-tab-pane label="页面管理" name="page"></el-tab-pane>
		<el-tab-pane label="页面分类" name="category"></el-tab-pane>
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
				if (name == 'page')
					this.$router.replace('list')
				else if (name == 'category')
					this.$router.replace('category')
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>