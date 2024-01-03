<template>
	<div class="com-control-image">
		<el-form class="com-control-form" @submit.native.prevent ref="form" :model="comAttrs" size="small">
			<setImgList ref="setImgList" :default-value.sync="comAttrs.imgs" :max-count="20" :min-count="1"></setImgList>
			<div class="com-control-area">
				<div class="com-control-area-title">样式设置</div>
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
				<el-form-item label="图片间距">
					<el-slider :min="0" :max="50" v-model="comAttrs.style.imgMarginBottom"></el-slider>
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
		data() {
			return {};
		},
		methods: {
			validate() {
				var result = this.$refs.setImgList.validate(true)
				return result
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
