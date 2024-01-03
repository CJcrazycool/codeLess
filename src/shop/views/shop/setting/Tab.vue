<template>
	<el-tabs v-model="value" :before-leave="beforeLeave" type="card">
		<el-tab-pane label="客房预订" name="order"></el-tab-pane>
		<el-tab-pane label="会员设置" name="member"></el-tab-pane>
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
				if (name == 'order')
					this.$router.replace('./room')
				else if (name == 'member')
					this.$router.replace('./member')
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>