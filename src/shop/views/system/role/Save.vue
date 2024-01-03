<template>
	<el-form class="dialog-form" @submit.native.prevent :model="form" ref="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row>
					<el-form-item label="角色名称" prop="roleName">
						<el-input v-model="form.roleName" placeholder="请填写角色名称"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="备注">
						<el-input v-model="form.description" placeholder="请填写备注" type="textarea">
						</el-input>
					</el-form-item>
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
	import systemRoleApi from '@shop/api/systemRole'

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
					'roleName': [{
						required: true,
						message: '请输入角色名称'
					}]
				},
				form: {
					roleName: '',
					roleCode: ''
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
				this.$request.load(systemRoleApi.queryById({
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
						message: '请完善角色信息'
					})
					return
				}

				const api = !this.id ? systemRoleApi.add : systemRoleApi.edit
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
