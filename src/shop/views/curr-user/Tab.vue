<template>
	<el-tabs class="inner-page-tab" v-model="value" :before-leave="beforeLeave" type="card">
		<el-tab-pane label="用户信息" name="user"></el-tab-pane>
		<el-tab-pane label="修改密码" name="editPwd"></el-tab-pane>
		<el-tab-pane label="关于系统" name="system"></el-tab-pane>
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
				if (name == 'system')
					this.$router.replace({
						path:'/curr-user/system',
						query:this.$route.query
					})
				else if (name == 'user')
					this.$router.replace({
						path:'/curr-user/user',
						query:this.$route.query
					})
				else if (name == 'editPwd')
					this.$router.replace({
						path:'/curr-user/edit-password',
						query:this.$route.query
					})
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>