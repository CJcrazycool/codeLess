<template>
	<div class="dialog-form">
		<treeMover ref="tree" node-key="id" :load-request="microPageTypeApi.treeList()"
		:drop-save-request="microPageTypeApi.sort()" @drop-success="$emit('move-success')">
		</treeMover>
		<div class="dialog-footer">
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</div>
</template>

<script>
	import microPageTypeApi from '@shop/api/microPageType'

	export default {
		props:{
		},
		components:{
		},
		data() {
			return {
				microPageTypeApi
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