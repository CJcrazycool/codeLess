<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body">
			<div class="form-area">
				<el-row>
				 <el-form-item label="数据集" prop="dictItemText">
					<el-input type="textarea" v-model="form.dictItemText" placeholder="请按照指定格式填写数据集"></el-input>
					<div class="form-item-tip">多条数据使用英文逗号隔开，示例：键:值,键:值</div>
				</el-form-item>
				</el-row>
			</div>
		</div>
		<div class="form-footer">
			<el-button native-type="submit" :disabled="!form.dictItemText" :loading="saveLoading" size="small" type="primary"
				@click="save">保存</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import {
		validateForm
	} from '@public/js/util'
	import dictApi from '@admin/api/dict'

	export default {
		props: {
			dictCode:{}
		},
		components: {},
		data() {
			return {
				saveLoading: false,
				form: {
					dictCode:this.dictCode,
					dictItemText: ''
				},
				rules: {
				}
			}
		},
		computed: {},
		watch: {},
		created() {
		},
		methods: {
			async save() {
				var vaild = await validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善数据信息'
					})
					return
				}
				console.log(this.form)
				this.$request.submit(dictApi.batchAddDictItems({
					params: this.form,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$emit('save')
					},
					successText: () => {
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
