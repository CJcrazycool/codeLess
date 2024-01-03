<template>
	<div>
		<el-alert class="refund-alert" show-icon :closable="false" type="warning">
			<template slot="title">退款金额将在3-5分钟内退回客人账户</template>
		</el-alert>
		<el-form class="dialog-form" @submit.native.prevent ref="form" size="small" :rules="rules">
			<div class="form-body">
				<div class="form-area">
					<el-row>
					  <el-form-item label="退款金额" prop="name">
						  <el-input-number v-if="maxFee!==null" :disabled="order.orderState != 'FINISH'" class="num-input-danger" v-model="form.refundFee" size="large" :min="0.01" :max="maxFee"
						  	label="退款金额" :precision="2" :controls="false"></el-input-number>
							<el-input-number v-else :disabled="true" class="num-input-danger" v-model="form.refundFee" size="large"
								label="退款金额" :precision="2" :controls="false"></el-input-number>
					  </el-form-item>
					</el-row>
					<el-row>
					  <el-form-item label="退款留言" prop="name">
					  	<el-input v-model="form.refundMessage" placeholder="可填写您对客人的留言" type="textarea"></el-input>
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
				<el-button native-type="submit" @click="submit" :loading="saveLoading" size="small" type="danger" :disabled="!checked">确认退款</el-button>
				<el-button size="small" @click="$emit('cancel')">取消</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import roomRefundOrderApi from '@shop/api/roomRefundOrder'
	import roomOrderApi from '@shop/api/roomOrder'

	export default {
		props:{
			order:null,
			refundOrder:null
		},
		components: {},
		data() {
			return {
				checked:false,
				roomRefundOrderApi,
				saveLoading:false,
				form: {
					refundSn:this.refundOrder.refundSn,
					refundFee: this.refundOrder.refundFee,
					refundMessage:''
				},
				rules: {
				},
				maxFee:null
			}
		},
		watch: {},
		computed: {},
		created() {
			this.loadMaxFee(this.order.orderSn)
		},
		methods: {
			loadMaxFee(orderSn){
				this.$request.load(roomOrderApi.queryMaxRefundFee({
					params: {
						orderSn
					},
					success:(response)=>{
						this.maxFee = response.data.result
					}
				}))
			},
			submit() {
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善退款信息'
					})
					return
				}
				this.$request.submit(roomRefundOrderApi.agree({
					params:{
						...this.form
					},
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if(!response.data.success)
							throw new Error()
						this.$emit('success')
					},
					successText:()=>{
						return '已同意退款'
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
