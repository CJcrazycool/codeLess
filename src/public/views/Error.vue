<template>
	<div class="error">
		<el-empty v-if="code=='error'" description="页面错误" :image-size="260">
			<div class="image" slot="image">
				<i class="el-icon-document-delete"></i>
			</div>
			<div>页面加载时发生错误，请刷新页面重试</div>
			<div class="operate"><el-button @click="reload" type="primary" size='small'>刷新重试</el-button></div>
		</el-empty>
		<el-empty v-if="code=='deny'" description="无权访问" :image-size="260">
			<div class="image" slot="image">
				<i class="el-icon-lock"></i>
			</div>
			<div>非常抱歉，当前账号无权访问</div>
			<div class="operate"><el-button @click="reload" type="primary" size='small'>刷新重试</el-button></div>
		</el-empty>
	</div>
</template>

<script>
	export default {
		props:{
			code:{}
		},
		data() {
			return {}
		},
		watch: {},
		computed: {},
		mounted() {},
		methods: {
			reload(){
				this.$router.go(0)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.error{
		padding-top: 5%;
	}
	
	.image {
		background-color: $--color-white;
		width: 260px;
		height: 260px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;

		i {
			font-size: 170px;
			color:$--color-text-placeholder;
		}
	}
	
	.operate{
		margin-top: 20px;
	}
</style>