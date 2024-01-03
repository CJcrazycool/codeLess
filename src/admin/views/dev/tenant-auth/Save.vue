<template>
	<div class="dialog-form">
		<el-form @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
			<div class="form-body" v-loading="loading==1">
				<div class="form-area">
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="权限名称" prop="name">
								<el-input v-model="form.name" placeholder="请填写权限名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="上级权限">
								<parentCascader class="fill-width" v-model="form.parentId" :curr="form.id"
									:clearable="true" placeholder="请选择上级权限" :options="this.categoryOptions"
									:props="{ label:'name'}"></parentCascader>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="授权标识" prop="perms">
								<el-input v-model="form.perms" placeholder="请填写授权标识"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="权限类型" prop="menuType">
								<dictSelect class="fill-width" dict-key="menu_type" parse-value="int" v-model="form.menuType" placeholder="请选择权限类型"></dictSelect>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="可见范围" prop="showType">
								<el-radio-group v-model="form.showType">
									<el-radio v-for="item in $dataDict.options('show_type',null,'boolean')" :key="item.value" :label="item.value" border>{{item.label}}</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col v-if="id" :span="12">
							<el-form-item label="序号">
								<el-input-number v-model="form.sortNo" :precision="0"></el-input-number>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="form-footer">
				<el-button native-type="submit" :disabled="loading!=2" :loading="saveLoading" size="small"
					type="primary" @click="save">保存</el-button>
				<el-button size="small" @click="$emit('cancel')">取消</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {
		validateForm
	} from '@public/js/util'
	import tenantAuthApi from '@admin/api/tenantAuth'

	export default {
		props: {
			id: {}
		},
		components: {},
		data() {
			return {
				loading: 2,
				saveLoading: false,
				rules: {
					'name': [{
						required: true,
						message: '请填写权限名称'
					}],
					// 'perms': [{
					// 	required: true,
					// 	message: '请填写授权标识'
					// }],
				},
				form: {
					id: this.id,
					name: '',
					parentId: null,
					perms: '',
					showType: true,
					menuType: 0,
					sortNo: 0
				},
				categoryOptions: [],
			}
		},
		computed: {},
		watch: {},
		created() {
			this.loadCategory()
			if (this.id)
				this.load(this.id)
		},
		methods: {
			loadCategory() {
				this.$request.load(tenantAuthApi.treeList({
					success: (response) => {
						this.categoryOptions = response.data.result ? response.data.result : []
					}
				}))
			},
			load(id) {
				this.$request.load(tenantAuthApi.queryById({
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
						message: '请完善权限信息'
					})
					return
				}
				var api = !this.form.id ? tenantAuthApi.add : tenantAuthApi.edit
				this.$request.submit(api({
					data: this.form,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if (response.data.success)
							this.$emit('save')
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
