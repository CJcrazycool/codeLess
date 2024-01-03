<template>
	<el-tabs v-model="value" :before-leave="beforeLeave" type="card">
		<el-tab-pane label="图片管理" name="image"></el-tab-pane>
		<el-tab-pane label="素材分类" name="category"></el-tab-pane>
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
				if (name == 'image')
					this.$router.replace('../image/list')
				else if (name == 'category')
					this.$router.replace('../category/list')
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>