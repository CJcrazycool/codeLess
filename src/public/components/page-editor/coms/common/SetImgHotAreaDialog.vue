<!-- 设置热区弹窗 -->
<template>
	<el-dialog class="dialog-form" :append-to-body="true" title="编辑图片热区" :visible.sync="dialogVisible" width="920px"
		@open="contentAlive=true" @closed="contentAlive=false" v-bind="$attrs" v-on="$listeners">
		<div>
			<div class="form-body">
				<setImgHotAreaContent v-if="contentAlive" :src="src" :hot-areas.sync="hotAreas"></setImgHotAreaContent>
			</div>
			<div class="form-footer">
				<el-button :disabled="hotAreas.length<=0" size="small" type="primary" @click="finish">确定</el-button>
				<el-button size="small" @click="dialogVisible = false">取消</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	import setImgHotAreaContent from './SetImgHotAreaContent'
	import lodashFp from 'lodash/fp'

	export default {
		components: {
			setImgHotAreaContent
		},
		props: {},
		watch: {},
		computed: {},
		data() {
			return {
				dialogVisible: false,
				finishCallback: null,
				src: null,
				hotAreas: [],
				contentAlive: false
			};
		},
		methods: {
			load(src, hotAreas, finishCallback) {
				this.dialogVisible = true
				this.src = src
				this.finishCallback = finishCallback
				this.hotAreas = this.hotAreas ? lodashFp.cloneDeep(hotAreas) : []
			},
			finish() {
				this.dialogVisible = false
				if (this.finishCallback)
					this.finishCallback(this.hotAreas)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-body{
		padding: 6px 20px;
	}
</style>