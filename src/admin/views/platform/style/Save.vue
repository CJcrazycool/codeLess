<template>
	<el-form class="drawer-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-form-item label="主题名称" prop="colorName">
					<el-input v-model="form.colorName" placeholder="请填写主题名称"></el-input>
				</el-form-item>
				<el-row>
					<el-form-item label="主色" prop="colorPrimary">
						<el-color-picker v-model="form.colorPrimary"></el-color-picker>
						<div class="form-item-tip">品牌识别色，主要用于主按钮、文字按钮、信息高亮等</div>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="配色" prop="colorSecondary">
						<el-color-picker v-model="form.colorSecondary"></el-color-picker>
						<div class="form-item-tip">搭配主色用来丰富视觉的配色</div>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="辅助色" prop="colorThrice">
						<el-color-picker v-model="form.colorThrice"></el-color-picker>
						<div class="form-item-tip">辅助色可用于价格或色彩点缀</div>
					</el-form-item>
				</el-row>
				<el-row v-if="id" :gutter="20">
					<el-col :span="12">
						<el-form-item label="排序序号" prop="sort">
							 <el-input-number v-model="form.sort"></el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="form-footer">
			<el-button native-type="submit" :disabled="loading!=2" :loading="saveLoading" size="small" type="primary"
				@click="save">保存</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import {
		validateForm
	} from '@public/js/util'
	import styleApi from '@admin/api/style'

	export default {
		props: {
			id: null
		},
		components: {},
		data() {
			return {
				loading: 2,
				saveLoading: false,
				rules: {
					'colorName': [{
						required: true,
						message: '请填写主题名称'
					}],
					'colorPrimary': [{
						required: true,
						message: '请选择主色'
					}],
					'colorSecondary': [{
						required: true,
						message: '请选择配色'
					}],
					'colorThrice': [{
						required: true,
						message: '请选择辅助色'
					}]
				},
				form: {
					colorName: '',
					colorPrimary:'',
					colorSecondary:'',
					colorThrice:'',
					sort:null
				}
			}
		},
		computed: {},
		watch: {},
		created() {
			if (this.id)
				this.load(this.id)
		},
		methods: {
			load(id) {
				this.$request.load(styleApi.queryById({
					params: {
						id
					},
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.form = response.data.result
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			save() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善主题信息'
					})
					return
				}
				const api = !this.id ? styleApi.add : styleApi.edit
				this.$request.submit(api({
					data: this.form,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$emit('success')
					},
					successText: (response) => {
						return '保存成功'
					},
					complete: () => {
						this.saveLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
