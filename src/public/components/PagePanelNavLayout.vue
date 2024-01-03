<template>
	<div class="page-panel page-panel-body">
		<div class="left-nav">
			<slot name="leftNav"></slot>
		</div>
		<div class="right-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	
	export default {
		props:{
			menu:{}
		},
		components: {
		},
		data() {
			return {}
		},
		computed: {},
		created() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	::v-deep .left-nav{
		
		//width: 130px;
		
		.el-menu{
			height: 100%;
			padding-right:20px;
			
			.el-menu-item{
				line-height:48px;
				height: 48px;
				&.is-active{
					background-color: $--color-primary-light-9;
				}
			}
		}
	}
	
	.page-panel{
	  flex-direction: row;
	}
	
	.right-content{
		padding-left:20px;
		width: 100%;
		display:flex;
		flex-direction: column;
	}
</style>
