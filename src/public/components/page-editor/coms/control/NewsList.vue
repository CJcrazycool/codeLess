<template>
	<div class="com-control-image">
		<el-form class="com-control-form" @submit.native.prevent ref="form" :model="comAttrs" size="small" :rules="rules">
			<div class="com-control-area">
				<div class="com-control-area-title">数据来源</div>
				<el-form-item>
					<el-radio-group @input="reloadData" v-model="comAttrs.data.from">
						<el-radio label="all">展示最新文章</el-radio>
						<el-radio label="group">展示文章分组</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-if="comAttrs.data.from == 'group'" label="文章分组" prop="data.groupId">
					<newsGroupSelect class="fill-width" v-model="comAttrs.data.groupId" :clearable="true" @change="reloadData"></newsGroupSelect>
				</el-form-item>
				<el-form-item label="显示条数" prop="data.size">
					<el-input-number v-model="comAttrs.data.size" :min="5" :max="20" label="条数" @change="reloadData"></el-input-number>
				</el-form-item>
			</div>
			<div class="com-control-area">
				<div class="com-control-area-title">样式设置</div>
				<el-form-item label="卡片边角">
					<el-radio-group v-model="comAttrs.style.radius">
						<el-radio label="default">直角</el-radio>
						<el-radio label="mini">小圆角</el-radio>
						<el-radio label="round">圆角</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="卡片阴影">
					<el-radio-group v-model="comAttrs.style.shadow">
						<el-radio label="none">无投影</el-radio>
						<el-radio label="shadow">投影</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="行间距">
					<el-slider :min="15" :max="30" v-model="comAttrs.style.marginBottom"></el-slider>
				</el-form-item>
				<el-form-item label="标题样式">
					<el-checkbox v-model="comAttrs.style.titleWeight" label="标题加粗"></el-checkbox>
					<el-checkbox v-model="comAttrs.style.titleBg" label="白底背景"></el-checkbox>
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
	import newsGroupSelect from '@shop/components/NewsGroupSelect'

	export default {
		mixins: [baseControl],
		components: {
			setComMargin,
			newsGroupSelect
		},
		data() {
			return {
				rules: {
					'data.groupId': [{
							required: true,
							message: '请选择文章分组'
						}
					],
					'data.size': [{
							required: true,
							message: '请填写显示条数'
						}
					]
				},
			};
		},
		methods: {
			reloadData(){
				this.comObj.$emit('reloadData')
			},
			validate() {
				var result = validateForm(this.$refs['form'])
				return result
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
