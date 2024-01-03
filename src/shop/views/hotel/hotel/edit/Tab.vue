<template>
	<el-tabs class="inner-page-tab" v-model="value" :before-leave="beforeLeave" type="card">
		<el-tab-pane label="编辑资料" name="edit"></el-tab-pane>
		<el-tab-pane label="相册图集" name="photo"></el-tab-pane>
		<el-tab-pane label="房型管理" name="room"></el-tab-pane>
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
				if (name == 'edit')
					this.$router.replace({
						path:'/hotel/hotel/edit',
						query:this.$route.query
					})
				else if (name == 'photo')
					this.$router.replace({
						path:'/hotel/hotel/edit/photo',
						query:this.$route.query
					})
				else if (name == 'room')
					this.$router.replace({
						path:'/hotel/hotel/edit/room',
						query:this.$route.query
					})
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>