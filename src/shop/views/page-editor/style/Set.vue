<template>
	<div class="page-panel">
		<el-form class="page-panel-form" @submit.native.prevent :rules="rules" :model="form"
			ref="form" size="small" label-position="left" label-width="120px">
			<div class="form-body setting-form-body">
					<div class="form-area-title top">主题设置</div>
					<div class="form-area" v-loading="loading == 1 || presetsLoading == 1">
						<el-form-item label="预设主题">
							<div class="presets-style">
								<div v-for="(item,index) in presets" class="style-item select-box"
									:class="{'selected':item.id==currPreset}" @click="selectPreset(item.id)">
									<div class="color-list">
										<div class="color-item" :style="{'background-color':item.colorPrimary}"></div>
										<div class="color-item" :style="{'background-color':item.colorSecondary}"></div>
										<div class="color-item" :style="{'background-color':item.colorThrice}"></div>
									</div>
									<div class="name">{{item.colorName}}</div>
									<div class="selected-badge">
										<div class="right-angle"></div>
										<div class="text"><i class="el-icon-check"></i></div>
									</div>
								</div>
								<div class="style-item select-box" :class="{'selected':'custom'==currPreset}"
									@click="selectPreset('custom')">
									<div class="color-list">
										<div class="color-item color-custom"><i class="el-icon-star-on"></i></div>
									</div>
									<div class="name">自定义主题</div>
									<div class="selected-badge">
										<div class="right-angle"></div>
										<div class="text"><i class="el-icon-check"></i></div>
									</div>
								</div>
							</div>
						</el-form-item>
						<template v-if="currPreset=='custom'">
							<el-form-item label="主色" prop="colorPrimary">
								<el-color-picker v-model="form.colorPrimary" size="medium"></el-color-picker>
								<div class="form-item-tip">品牌识别色，主要用于主按钮、文字按钮、信息高亮等</div>
							</el-form-item>
							<el-form-item label="配色" prop="colorSecondary">
								<el-color-picker v-model="form.colorSecondary" size="medium"></el-color-picker>
								<div class="form-item-tip">搭配主色用来丰富视觉的配色</div>
							</el-form-item>
							<el-form-item label="辅助色" prop="colorThrice">
								<el-color-picker v-model="form.colorThrice" size="medium"></el-color-picker>
								<div class="form-item-tip">辅助色可用于价格或色彩点缀</div>
							</el-form-item>
						</template>
					</div>
			</div>
			<div class="form-footer">
				<el-button type="primary" :disabled="loading!=2 || presetsLoading!=2" :loading="saveLoading" native-type="submit"
					size="small" @click="save">保存
				</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {
		validateForm
	} from '@public/js/util'
	import styleApi from '@shop/api/style'
	import {
		dateHelper
	} from '@public/js/util'

	export default {
		components: {},
		watch: {
		},
		data() {
			return {
				currPreset: null,
				presetsLoading:2,
				loading: 2,
				presets: [],
				saveLoading: false,
				form: null
			}
		},
		computed: {
			rules() {
				var rules = {}
				if (this.currPreset && this.currPreset=='custom'){
					rules['colorPrimary'] = [{
						required: true,
						message: '请选择主色'
					}]
					rules['colorSecondary'] = [{
						required: true,
						message: '请选择配色'
					}]
					rules['colorThrice'] = [{
						required: true,
						message: '请选择辅助色'
					}]
				}
				return rules
			}
		},
		created() {
			this.loadPresets()
			this.load()
		},
		methods: {
			selectPreset(value) {
				this.currPreset = value
			},
			loadPresets(){
				this.$request.load(styleApi.queryPresets({
					before: () => {
						this.presetsLoading = 1
					},
					success: (response) => {
						if (!response.data.success) {
							throw new Error()
						}
						this.presets = response.data.result
						this.presetsLoading = 2
					},
					error: (response) => {
						this.presetsLoading = 0
					}
				}))
			},
			load() {
				this.$request.load(styleApi.queryByShop({
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.success) {
							throw new Error()
						}
						if(response.data.result){
							this.selectPreset(response.data.result.quoteColorPreinstall?response.data.result.quoteThemeColorId:'custom')
							this.form = response.data.result
						}
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			createFormData(form){
				if(this.currPreset=='custom'){
					form.quoteColorPreinstall = false
					form.quoteThemeColorId = null
				}else{
					form.quoteColorPreinstall = true
					form.quoteThemeColorId = this.currPreset
				}
			},
			save() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善配置信息'
					})
					return
				}
				this.createFormData(this.form)
				this.$request.submit(styleApi.save({
					data: {
						...this.form
					},
					before: () => {
						this.saveLoading = true
					},
					showSuccessMessage: 'alert',
					success: (response) => {

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
	.presets-style {
		display: flex;
	}

	.style-item {
		overflow: hidden;
		position: relative;
		cursor: pointer;
		padding: 20px;
		box-sizing: border-box;
		border: $--border-base;
		border-radius: $--border-radius-base;
		margin-right: 20px;
		margin-bottom: 20px;
		color: $--color-text-secondary;

		&.selected {
			color: $--color-primary;
		}

		&:hover {
			border-color: $--color-primary;
			color: $--color-primary;
		}

		.color-list {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 10px;
		}

		.color-item {
			width: 32px;
			height: 32px;
			margin-right: 8px;
			border-radius: 50%;
			&:last-child{
				margin-right: 0px;
			}
		}

		.color-custom {
			width: 110px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 40px;
		}

		.name {
			margin-top: 8px;
			line-height: 12px;
			text-align: center;
		}
	}
</style>
