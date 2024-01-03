<!-- 内页布局 -->
<template>
	<div class="inner-page-layout">
		<div class="inner-page-header">
			<div class="center">
				<div>
					<img class="logo" src="@public/assets/img/logo_light.png">
				</div>
				<headerOperate></headerOperate>
			</div>
		</div>
		<div class="inner-page-content">
			<slot></slot>
		</div>
		<pageFooter></pageFooter>
	</div>
</template>

<script>
	import headerOperate from './HeaderOperate'

	export default {
		components: {
			headerOperate
		},
		data() {
			return {
			}
		},
		mounted() {},
		methods: {}
	}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
	.inner-page-header {
		background-color: $nav-menu-background-color;
		margin-bottom: 20px;
		height: $header-menu-height;
		display: flex;
		align-items: center;
		
		.center {
			width: 1150px;
			margin: auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.title{
				display: inline-block;
				color: $--color-white;
				font-size: $--font-size-medium;
				margin-left: 12px;
				border-left: $--border-base;
				border-left-color: $--color-text-regular;
				padding-left: 12px;
			}
		
			.logo {
				height: 35px;
				display: inline-block;
				vertical-align:middle;
			}
		}
	}
	
	::v-deep.header-operate {
		.button {
			&:hover {
				color: $--color-white;
				background-color: rgba($--color-white, .1);
			}
		}
	
		.user-box {
	
			.user-name {
				color: $--color-white;
			}
	
			.user-id {
				color: $--color-text-placeholder;
			}
	
			.down-icon {
				color: $--color-text-placeholder;
			}
		}
	}
	
	.inner-page-layout {
		background-color: $--color-white;
		display: flex;
		flex-direction: column;
		min-width: 1150px;
		min-height: 100%;
	}
	
	.inner-page-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	
	
	::v-deep .inner-page-title,::v-deep .inner-page-center{
		width: 1150px;
		margin: auto;
		padding: 15px 10px;
	}
	
	::v-deep .inner-page-title{
		border-bottom: $--border-color-light 1px solid;
		margin-bottom: 20px;
	}
	
	::v-deep .inner-page-center {
		flex: 1;
		padding-bottom: 50px;
	}
	
	::v-deep .page-footer {
		background-color: $background-color-deep;
	}
</style>