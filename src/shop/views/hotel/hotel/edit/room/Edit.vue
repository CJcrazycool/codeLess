<template>
	<el-form class="drawer-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div v-loading="loading==1" class="form-body">
			<div class="form-area">
				<el-form-item label="封面图">
					<imageZoneSelector :limit="5" v-model="form.img"></imageZoneSelector>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="房型名称" prop="name">
							<el-input disabled :value="form.name" placeholder="请填写房型名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="alias">
							<div slot="label">房型别名<helpTip>别名将会在客户端展现，如为空则优先展示房型名称</helpTip></div>
							<el-input v-model="form.anotherName" placeholder="别名为空默认展示房型名称"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="房型描述">
						<editor v-model="form.roomTypeDescribe" mode="simple" height="300px" placeholder="请填写房型描述"></editor>
					</el-form-item>
				</el-row>
			</div>
			<div class="form-area-title">房型属性</div>
			<div v-if="attrForm.length<=0" class="empty">
				<div class="tip">当前字段为空，请先进行<el-button type="text" @click="$emit('columnConfig')">字段配置</el-button></div>
			</div>
			<div v-else class="form-area">
				<el-row :gutter="20">
					<el-col v-for="(item) in attrForm" :key="item.id" :span="12">
						<el-form-item :label="item.label">
							<el-input v-model="item.value" :placeholder="'请填写'+item.label"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<div class="form-area-title">设施/服务</div>
			<div v-if="supportForm.length<=0" class="empty">
				<div class="tip">当前字段为空，请先进行<el-button type="text" @click="$emit('columnConfig')">字段配置</el-button></div>
			</div>
			<div v-else class="form-area">
				<el-row :gutter="20">
					<el-col v-for="(item) in supportForm" :key="item.id" :span="12">
						<el-form-item :label="item.label">
							<el-input v-model="item.value" :placeholder="'请填写'+item.label"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="form-footer">
			<el-button :disabled="loading!=2" :loading="saveLoading" native-type="submit" size="small" type="primary"
				@click="save">保存</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import {validateForm,strings} from '@public/js/util'
	import roomApi from '@shop/api/room'

	export default {
		components: {

		},
		props: {
			loadId: {}
		},
		data() {
			return {
				renderKey: 0,
				roomApi,
				loading: 0,
				saveLoading: false,
				form: {},
				attrForm: [],
				supportForm: [],
				rules: {}
			}
		},
		computed: {},
		created() {
			this.load(this.loadId)
		},
		methods: {
			load(id) {
				this.$request.mergeLoad({
					sync: true,
					before: () => {
						this.loading = 1
					},
					success: () => {
						this.loading = 2
					},
					error: () => {
						this.loading = 0
					},
					list: [
						roomApi.queryById({
							params: {
								id
							},
							success: (responce) => {
								if (!responce.data.result) {
									throw new Error()
								}
								this.form = responce.data.result
								this.form.attribute = this.form.attribute ? JSON.parse(this.form
									.attribute) : {}
								this.form.facility = this.form.facility ? JSON.parse(this.form
									.facility) : {}
							}
						}),
						roomApi.columnList({
							success: (response) => {
								var attr = []
								var support = []
								response.data.result.forEach((item) => {
									if (item.facilityType == 0)
										attr.push(item)
									else if (item.facilityType == 1)
										support.push(item)
								})
								attr.forEach((item) => {
									this.attrForm.push({
										id: item.id,
										label: item.name,
										value: this.form.attribute[item.id]
									})
								})
								support.forEach((item) => {
									this.supportForm.push({
										id: item.id,
										label: item.name,
										value: this.form.facility[item.id]
									})
								})
							}
						})
					]
				})
			},
			save() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善房型信息'
					})
					return
				}
				var attr = {}
				var support = {}
				this.attrForm.forEach((item) => {
					attr[item.id] = item.value
				})
				this.supportForm.forEach((item) => {
					support[item.id] = item.value
				})
				this.$request.submit(roomApi.edit({
					data: {
						...this.form,
						...{
							attribute: JSON.stringify(attr),
							facility: JSON.stringify(support)
						}
					},
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						this.$emit('save', this.form)
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
	.empty {
		text-align: center;
	}
</style>