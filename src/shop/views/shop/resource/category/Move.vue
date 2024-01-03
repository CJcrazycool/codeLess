<template>
	<div class="dialog-form">
		<treeMover ref="tree" node-key="id" :load-request="resourceCategoryApi.treeList()" default-expand-all
		:drop-save-request="resourceCategoryApi.sort()" @drop-success="$emit('move-success')">
		</treeMover>
		<div class="dialog-footer">
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</div>
</template>

<script>
	import resourceCategoryApi from '@shop/api/resourceCategory'

	export default {
		props:{
		},
		components:{
		},
		data() {
			return {
				resourceCategoryApi
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
</style>