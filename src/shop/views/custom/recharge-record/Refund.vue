<template>
	<div>
		<el-alert class="refund-alert" show-icon :closable="false" type="warning">
			<template slot="title">退款金额将在3-5分钟内退回客人账户</template>
		</el-alert>
		<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
			<div class="form-body">
				<div class="form-area">
					<el-row>
					  <el-form-item label="退款金额" prop="name">
						  <el-input-number :disabled="true" class="num-input-danger" v-model="form.refundFee" size="large"
						  	label="退款金额" :precision="2" :controls="false"></el-input-number>
							<div class="form-item-tip">注意：充值退款只支持全额退款，已充值成功的到账金额不会扣减</div>
					  </el-form-item>
					</el-row>
					<el-row>
					  <el-form-item>
						  <el-checkbox v-model="checked">我已知悉退款风险与退款条例</el-checkbox>
					  </el-form-item>
					</el-row>
				</div>
			</div>
			<div class="form-footer">
				<el-button native-type="submit" :disabled="!checked" :loading="saveLoading" size="small" type="primary" @click="save">确认退款</el-button>
				<el-button size="small" @click="$emit('cancel')">取消</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import rechargeOrderApi from '@shop/api/rechargeOrder'

	export default {
		props:{
			data:{}
		},
		components:{
		},
		data() {
			return {
				saveLoading:false,
				form:{
					refundFee:this.data.payPrice
				},
				checked:false,
				rules:{}
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
		},
		methods: {
			save(){
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善退款信息'
					})
					return
				}
				this.$request.submit(rechargeOrderApi.refund({
					params: {
						orderSn:this.data.orderSn
					},
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if(response.data.success)
							this.$emit('success')
					},
					successText:()=>{
						return '退款成功'
					},
					complete:()=>{
						this.saveLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>