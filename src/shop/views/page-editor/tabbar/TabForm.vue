<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body">
			<div class="form-area">
				<el-form-item label="菜单名称" prop="name">
					<el-input v-model="form.name" :maxlength="nameMaxLength"></el-input>
				</el-form-item>
				<el-form-item prop="link">
					<setLinkButton v-model="form.link"
						:button-attrs="{type:'text',icon:'el-icon-link',size:'medium'}"
						:popover-options="{placement:'bottom-start'}">链接页面</setLinkButton>
				</el-form-item>
				<el-form-item label="菜单图标" prop="unActiveIcon">
					<div class="upload-tip tip">建议图片宽高为100x100</div>
					<div class="upload-icon-wrap">
						<div class="item">
							<imageZoneSelector v-model="form.unActiveIcon" :multiple="false"></imageZoneSelector>
							<div class="text">未选中</div>
						</div>
						<div class="item">
							<imageZoneSelector v-model="form.activeIcon" :multiple="false"></imageZoneSelector>
							<div class="text">选中</div>
						</div>
					</div>
				</el-form-item>
			</div>
		</div>
		<div class="form-footer">
			<el-button type="primary" size="small" @click="save" native-type="submit">确定</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import setLinkButton from '@public/components/page-editor/coms/common/SetLinkButton'
	import lodashFp from 'lodash/fp'
	import {validateForm} from '@public/js/util'

	export default {
		props: {
			defaultForm: {}
		},
		components: {
			setLinkButton
		},
		data() {
			return {
				nameMaxLength: 5,
				rules: {
					'name': [{
						required: true,
						message: '请填写菜单名称'
					}],
					'link': [{
						required: true,
						message: '请选择链接页面',
						trigger: 'blur'
					}],
					'unActiveIcon': [{
						required: true,
						validator: (rule, value, callback) => {
							if (!this.form.unActiveIcon || !this.form.activeIcon) {
								callback(new Error())
							}
							callback()
						},
						message: '请完整上传菜单图片',
						trigger: 'blur'
					}]
				},
				form: this.defaultForm ? lodashFp.cloneDeep(this.defaultForm) : {
					name: '',
					unActiveIcon: null,
					activeIcon: null,
					link: ''
				}
			}
		},
		watch: {},
		mounted(){
		},
		methods: {
			save() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善菜单信息'
					})
					return
				}
				this.$emit('save', this.form)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upload-tip {
		margin-bottom: 5px;
	}

	.upload-icon-wrap {
		display: flex;

		.item {
			margin-right: 20px;
			
			.text {
				text-align: center;
				line-height: 20px;
				margin-bottom: 10px;
			}
		}
	}
</style>
