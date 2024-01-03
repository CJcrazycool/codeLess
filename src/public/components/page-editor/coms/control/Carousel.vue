<template>
	<div class="com-carousel-control">
		<el-form class="com-control-form" @submit.native.prevent ref="form" :model="comAttrs" size="small">
			<setImgList :hidden-hot-area="true" ref="setImgList" :default-value.sync="comAttrs.imgs" :max-count="5" :min-count="1"></setImgList>
			<div class="com-control-area">
				<div class="com-control-area-title">样式设置</div>
				<!-- <el-form-item label="幻灯片风格">
					<el-radio-group v-model="comAttrs.style.type">
						<el-radio label="default">默认</el-radio>
						<el-radio label="tdcard">3D卡片</el-radio>
					</el-radio-group>
				</el-form-item> -->
				<el-form-item label="幻灯片高度">
					<el-input-number v-model="comAttrs.style.height" controls-position="right" :min="0">
					</el-input-number>
				</el-form-item>
				<el-form-item label="指示灯样式">
					<el-radio-group v-model="comAttrs.style.paginationPosition">
						<el-radio label="show">显示</el-radio>
						<el-radio label="hide">隐藏</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="指示灯底部距离" v-show="comAttrs.style.paginationPosition=='show'">
					<el-input-number v-model="comAttrs.style.paginationPositionY" controls-position="right"
						:min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="图片边角">
					<el-radio-group v-model="comAttrs.style.radius">
						<el-radio label="default">直角</el-radio>
						<el-radio label="round">圆角</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="图片阴影">
					<el-radio-group v-model="comAttrs.style.shadow">
						<el-radio label="none">无投影</el-radio>
						<el-radio label="shadow">投影</el-radio>
					</el-radio-group>
				</el-form-item>
			</div>
			<setComMargin :margin="comAttrs.style.padding"></setComMargin>
		</el-form>
	</div>
</template>

<script>
	import setImgList from '../common/SetImgList'
	import setComMargin from '../common/SetComMargin'
	import baseControl from './BaseControl.vue'

	export default {
		mixins: [baseControl],
		components: {
			setImgList,
			setComMargin
		},
		watch: {
			'comAttrs.style.type': {
				immediate:true,
				handler(value) {
					this.checkStyleType()
				}
			},
			'comAttrs.imgs': {
				immediate:true,
				handler(value) {
					this.checkStyleType()
				}
			}
		},
		data() {
			return {};
		},
		created() {},
		methods: {
			validate() {
				var result = this.$refs.setImgList.validate(true)
				return result
			},
			checkStyleType(){
				if(this.comAttrs && this.comAttrs.style.type== 'tdcard' && this.comAttrs.imgs.length < 3){
					this.$message({
						message: '3D卡片至少需设置3张图片',
						type: 'error'
					});
					this.comAttrs.style.type = 'default'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>