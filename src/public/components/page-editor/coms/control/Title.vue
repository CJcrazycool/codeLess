<template>
	<div class="com-control-image">
		<el-form class="com-control-form" @submit.native.prevent ref="form" :model="comAttrs" size="small" :rules="rules">
			<div class="com-control-area">
				<el-form-item class="large-label" label="标题文本" prop="title">
					<el-input placeholder="请填写标题文本" v-model="comAttrs.title"></el-input>
				</el-form-item>
			</div>
			<div class="com-control-area">
				<div class="com-control-area-title">样式设置</div>
				<el-form-item label="标题样式">
					<el-checkbox v-model="comAttrs.style.titleWeight" label="标题加粗"></el-checkbox>
					<el-checkbox v-model="comAttrs.style.titleDecoration" label="装饰标题"></el-checkbox>
				</el-form-item>
				<el-form-item label="标题大小">
					<el-radio-group v-model="comAttrs.style.titleSize">
						<el-radio label="small">小号</el-radio>
						<el-radio label="medium">中等</el-radio>
						<el-radio label="large">大号</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="查看更多">
					<el-checkbox v-model="comAttrs.showMore" label="显示更多按钮"></el-checkbox>
				</el-form-item>
				<el-form-item label="设置更多跳转" prop="moreLink" v-if="comAttrs.showMore">
					<setLinkButton v-model="comAttrs.moreLink" :button-attrs="{type:'text',icon:'el-icon-link',size:'medium'}">跳转链接</setLinkButton>
				</el-form-item>
			</div>
			<setComMargin :margin="comAttrs.style.padding"></setComMargin>
		</el-form>
	</div>
</template>

<script>
	import setComMargin from '../common/SetComMargin'
	import baseControl from './BaseControl.vue'
	import {validateForm} from '@public/js/util'
	import setLinkButton from '../common/SetLinkButton'

	export default {
		mixins: [baseControl],
		components: {
			setComMargin,
			setLinkButton
		},
		data() {
			return {
				rules: {
					'title': [{
							required: true,
							message: '请填写标题'
						}
					],
					'moreLink': [{
							required: true,
							message: '请选择跳转链接'
						}
					]
				},
			};
		},
		methods: {
			validate() {
				var result = validateForm(this.$refs['form'])
				return result
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
