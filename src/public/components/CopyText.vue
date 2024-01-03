<!-- 复制文本内容按钮 -->
<template>
	<el-button title="复制" v-if="text" :copy-id="id" data-clipboard-action="copy" :data-clipboard-text="text" size="small" type="text"
		class="copy-text el-icon-copy-document"></el-button>
</template>

<script>
	import clipboard from 'clipboard'
	import {
		nanoid
	} from 'nanoid'

	export default {
		props: {
			text: {}
		},
		data() {
			return {
				id: nanoid()
			}
		},
		mounted() {
			new clipboard(".copy-text[copy-id='" + this.id + "']").on('success', () =>{
				this.$message({
					type: 'success',
					message: '复制成功'
				})
			}).on('error', ()=> {
				this.$message({
					type: 'error',
					message: '复制失败'
				});
			})
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
</style>
