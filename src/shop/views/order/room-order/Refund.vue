<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" size="small" :model="form" :rules="rules">
		<div class="form-body">
			<div class="form-area">
				<el-row>
					<el-form-item prop="refundFee" label="申请金额"> 
					<el-input-number v-if="maxFee!==null" :disabled="order.orderState != 'FINISH'" class="num-input-danger" v-model="form.refundFee" size="large" :min="0.01" :max="maxFee"
						label="退款金额" :precision="2" :controls="false"></el-input-number>
					<el-input-number v-else class="num-input-danger" :disabled="true" v-model="form.refundFee" size="large"
						label="退款金额" :precision="2" :controls="false"></el-input-number>
					</el-form-item>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item prop="refundReason" label="申请原因">
							<dictSelect class="fill-width" dict-key="room_order_refund_reason" 
								v-model="form.refundReason" placeholder="请选择申请原因" :clearable="true"></dictSelect>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="mobile" label="联系手机">
							<el-input v-model="form.mobile" placeholder="请填写联系手机"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="申请说明">
						<el-input v-model="form.refundExplain" placeholder="请填写申请说明" type="textarea"></el-input>
					</el-form-item>
				</el-row>
			</div>
		</div>
		<div class="form-footer">
			<el-button :disabled="form.refundFee<=0" native-type="submit" size="small" type="danger" :loading="saveLoading" @click="submit">申请退款</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import roomRefundOrderApi from '@shop/api/roomRefundOrder'
	import roomOrderApi from '@shop/api/roomOrder'

	export default {
		props:{
			order:null
		},
		components: {},
		data() {
			return {
				roomRefundOrderApi,
				saveLoading:false,
				form: {
					orderSn:this.order.orderSn,
					refundFee: 0,
					mobile:'',
					refundReason:'',
					refundExplain:''
				},
				rules: {
					'price': [{
						required: true,
						message: '请填写退款金额'
					}],
					'refundReason': [{
						required: true,
						message: '请选择申请原因'
					}],
					'mobile': [{
						required: true,
						message: '请填写联系手机'
					}],
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
						this.form.refundFee = this.maxFee
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
				this.$request.submit(roomRefundOrderApi.replaceRefund({
					data:{
						...this.form
					},
					before: () => {
						this.saveLoading = true
					},
					showSuccessMessage:false,
					success: (response) => {
						if(!response.data.success || !response.data.result)
							throw new Error()
						this.$confirm('已提交退款申请', '提示', {
							confirmButtonText: '退款详情',
							cancelButtonText: '关闭',
							type: 'success',
							center: true,
							beforeClose: (action, instance, done) => {
								done()
								if(action!='confirm')
									this.$emit('success')
							}
						}).then(() => {
							this.$router.push({
								path: '../room-refund/detail',
								query:{
									refundSn:response.data.result
								}
							})
						}).catch(()=>{
							
						})
						this.saveLoading = false
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
