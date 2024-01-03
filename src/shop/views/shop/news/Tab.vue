<template>
	<el-tabs v-model="value" :before-leave="beforeLeave" type="card">
		<el-tab-pane label="文章管理" name="news"></el-tab-pane>
		<el-tab-pane label="文章分组" name="group"></el-tab-pane>
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
				if (name == 'news')
					this.$router.replace('/shop/news/list')
				else if (name == 'group')
					this.$router.replace('/shop/news/group/list')
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>