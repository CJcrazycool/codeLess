<!-- 树形数据移动 -->
<template>
	<div class="tree-mover">
		<div class="tip"><i class="el-icon-question span_right"></i>拖拽可进行移动</div>
		<treeView class="tree-view" v-bind="$attrs" v-on="$listeners" :header="false" ref="tree" :drag="true">
		</treeView>
	</div>
</template>

<script>

	export default {
		props:{
		},
		components:{
		},
		data() {
			return {
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.tip{
		margin-bottom: 10px;
	}
	
	.tree-view{
		box-sizing: border-box;
		min-height: auto;
		height: 400px;
		overflow: auto;
		border: $--border-base;
		border-color: $--border-color-light;
		border-radius: 2px;
		padding: 10px;
		
		::v-deep .el-tree-node__content{
			cursor: grab;
		}
	}
</style>