<template>
	<div class="page-panel" v-loading="loading==1">
		<el-form class="page-panel-form" :rules="rules" :model="form" ref="form" size="small" label-position="left"
			label-width="200px">
			<div class="form-body setting-form-body">
				<tabHeader class="inner-page-tab" value="member"></tabHeader>
				<div v-loading="loading == 1">
					<div class="form-area-title top">会员充值</div>
					<div class="form-area">
						<el-form-item label="充值失败自动退款">
							<el-switch v-model="form.rechargeFailRefund"></el-switch>
							<div class="form-item-tip">开启自动退款后，充值失败的订单如多次重试失败将自动退款</div>
						</el-form-item>
					</div>
				</div>
			</div>
			<div class="form-footer">
				<el-button type="primary" :disabled="loading!=2" :loading="saveLoading" size="small" @click="save">保存
				</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import shopConfigApi from '@shop/api/shopConfig'
	import tabHeader from './Tab'

	export default {
		components: {
			tabHeader
		},
		data() {
			return {
				rules: {},
				form: {
					//充值失败，自动退款
					rechargeFailRefund: false
				},
				loading: 2,
				saveLoading: false
			}
		},
		computed: {},
		created() {
			this.load()
		},
		methods: {
			load(){
				this.$request.load(shopConfigApi.queryMemberConfig({
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.form = response.data.result;
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
						message: '请完善配置信息'
					})
					return
				}
				this.$request.submit(shopConfigApi.saveMemberConfig({
					data:{
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
</style>
