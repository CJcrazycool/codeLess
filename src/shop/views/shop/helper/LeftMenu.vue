<template>
	<el-menu :default-active="value" @select="selectMenu">
		  <el-menu-item index="wxapp">微信小程序</el-menu-item>
		  <el-menu-item index="wxmp">微信公众号</el-menu-item>
		  <el-menu-item index="pay">支付配置</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		props:{
			value:{}
		},
		components: {},
		data() {
			return {}
		},
		computed: {},
		created() {},
		methods: {
			selectMenu(value){
				if (value == 'wxapp')
					this.$router.replace('./wxapp')
				else if (value == 'wxmp')
					this.$router.replace('./wxmp')
				else if (value == 'pay')
					this.$router.replace('./pay')
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
