<template>
	<div class="com-control-border">
		<el-form class="com-control-form" @submit.native.prevent ref="form" :model="comAttrs.style" size="small">
			<div class="com-control-area">
				<div class="com-control-area-title">分割类型</div>
				<el-form-item>
					<el-radio v-model="comAttrs.type" label="empty">空白区</el-radio>
					<el-radio v-model="comAttrs.type" label="line">辅助线</el-radio>
				</el-form-item>
			</div>
			<div class="com-control-area">
				<div class="com-control-area-title">样式设置</div>
				<template v-if="comAttrs.type=='empty'">
					<el-form-item prop="phone" label="空白高度">
						 <el-slider :min="15" :max="100" v-model="comAttrs.style.emptyHeight"></el-slider>
					</el-form-item>
				</template>
				<template v-else-if="comAttrs.type=='line'">
					<el-form-item label="线条风格">
						<el-radio v-model="comAttrs.style.borderStyle" label="solid">实线</el-radio>
						<el-radio v-model="comAttrs.style.borderStyle" label="dashed">虚线</el-radio>
						<!-- <el-radio v-model="comAttrs.style.borderStyle" label="dotted">点线</el-radio> -->
					</el-form-item>
					<el-form-item label="线条颜色">
						<el-color-picker v-model="comAttrs.style.borderColor" size="medium"></el-color-picker>
					</el-form-item>
					<el-form-item label="线条粗细">
						 <el-slider :min="1" :max="5" v-model="comAttrs.style.borderWidth"></el-slider>
					</el-form-item>
				</template>
			</div>
			<setComMargin v-if="comAttrs.type=='line'" :margin="comAttrs.style.margin"></setComMargin>
		</el-form>
	</div>
</template>

<script>
	import baseControl from './BaseControl.vue'
	import setComMargin from '../common/SetComMargin'
	
	export default {
		mixins: [baseControl],
		components: {
			setComMargin
		},
		data() {
			return {};
		},
		created() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
</style>
