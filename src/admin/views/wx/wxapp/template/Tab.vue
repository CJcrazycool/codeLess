<template>
	<el-tabs class="inner-page-tab" v-model="value" :before-leave="beforeLeave" type="card">
		<el-tab-pane label="模板库" name="template"></el-tab-pane>
		<el-tab-pane label="草稿箱" name="draft"></el-tab-pane>
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
				if (name == 'draft')
					this.$router.replace({
						path:'./draft',
						query:this.$route.query
					})
				else if (name == 'template')
					this.$router.replace({
						path:'./list',
						query:this.$route.query
					})
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>