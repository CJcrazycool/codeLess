<template>
	<el-form class="drawer-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body" v-loading="loading==1">
			<div class="form-area">
				<el-row :gutter="20">
				  <el-col :span="12">
					  <el-form-item label="充值单号">
						<div class="form-item-text">
							<textContent :text='form.orderSn'><copyText slot="operate" :text="form.orderSn"></copyText></textContent>
						</div>
					  </el-form-item>
				  </el-col>
				  <el-col :span="12">
					  <el-form-item label="支付单号">
						<div class="form-item-text">
							<textContent :text='form.paySn'><copyText slot="operate" :text="form.paySn"></copyText></textContent>
						</div>
					  </el-form-item>
				  </el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="12">
					  <el-form-item label="充值金额">
						<div class="form-item-text">
							<textContent :text="$formatter.price(form.payPrice)"></textContent>
						</div>
					  </el-form-item>
				  </el-col>
				  <el-col :span="12">
					  <el-form-item label="充值状态">
						<div class="form-item-text">
							<textContent>
								<span :class="{'text-success':form.orderState=='FINISH','text-danger':form.orderState=='RECHARGE_FAIL'}">{{form.orderState_dictText}}</span>
								<el-button v-if="form.orderState=='RECHARGE_FAIL' && form.payState == 'FINISH'" slot="operate"
									:loading="retryLoading" class="span_left" size="mini" type="text" @click="retry">重试</el-button>
							</textContent>
						</div>
					  </el-form-item>
				  </el-col>
				</el-row>
			</div>
			<template v-if="form.totalRefund>0">
				<div class="form-area-title">退款信息</div>
				<div class="form-area">
					<el-row :gutter="20">
					  <el-col :span="12">
						  <el-form-item label="退款金额">
							<div class="form-item-text">
								<textContent class="text-danger" :text="$formatter.price(form.totalRefund)"></textContent>
							</div>
						  </el-form-item>
					  </el-col>
					  <el-col :span="12">
						  <el-form-item label="退款时间">
							<div class="form-item-text">
								<textContent :text="form.refundTime"></textContent>
							</div>
						  </el-form-item>
					  </el-col>
					</el-row>
				</div>
			</template>
			<div class="form-area-title">会员卡信息</div>
			<div class="form-area">
				<el-row :gutter="20">
				  <el-col :span="12">
					  <el-form-item label="会员等级">
						<div class="form-item-text">
							<textContent :text="form.mbrCardTypeName"></textContent>
						</div>
					  </el-form-item>
				  </el-col>
				  <el-col :span="12">
					  <el-form-item label="会员卡号">
						<div class="form-item-text">
							<textContent :text="form.mbrCardNo"></textContent>
						</div>
					  </el-form-item>
				  </el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="12">
					  <el-form-item label="手机号">
						<div class="form-item-text">
							<textContent :text="form.mobile"></textContent>
						</div>
					  </el-form-item>
				  </el-col>
				</el-row>
			</div>
			<div class="form-area-title">充值渠道</div>
			<div class="form-area">
				<el-row :gutter="20">
				  <el-col :span="12">
					  <el-form-item label="归属业务员">
						<div class="form-item-text">
							<textContent :text="form.saleName"></textContent>
						</div>
					  </el-form-item>
				  </el-col>
				  <el-col :span="12">
					  <el-form-item label="归属门店">
						<div class="form-item-text">
							<textContent :text="form.hotelName"></textContent>
						</div>
					  </el-form-item>
				  </el-col>
				</el-row>
			</div>
		</div>
		<div class="form-footer">
			<el-button v-if="form.payState == 'FINISH'" size="small" type="danger" @click="refundVisible=true">全额退款</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
		<el-dialog :append-to-body="true" title="全额退款" :visible.sync="refundVisible" width="580px" @open="refundAlive=true" @closed="refundAlive=false">
			<refundForm @success="refundSuccess" :data="form" v-if="refundAlive" @cancel="refundVisible=false"></refundForm>
		</el-dialog>
	</el-form>
</template>

<script>
	import rechargeOrderApi from '@shop/api/rechargeOrder'
	import refundForm from './Refund'

	export default {
		props:{
			id:{}
		},
		components:{
			refundForm
		},
		data() {
			return {
				loading:2,
				form:{
					orderSn:'',
					paySn:'',
					payPrice:0,
					orderState:null,
					orderState_dictText:'',
					totalRefund:0,
					refundTime:'',
					mbrCardTypeName:'',
					mbrCardNo:'',
					mobile:'',
					saleName:'',
					hotelName:''
				},
				rules:{},
				refundVisible:false,
				refundAlive:false,
				retryLoading:false
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
			this.load()
		},
		methods: {
			load(){
				if(this.id)
					this.loadData(this.id)
			},
			loadData(id){
				this.$request.load(rechargeOrderApi.queryById({
					params: {
						orderSn:this.id
					},
					before:()=>{
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
			retry(){
				console.log('retry')
				this.$request.submit(rechargeOrderApi.retry({
					params: {
						orderSn:this.id
					},
					before: () => {
						this.retryLoading = true
					},
					success: (response) => {
						if(response.data.success)
							this.load()
					},
					successText:()=>{
						return '已重试充值'
					},
					complete:()=>{
						this.retryLoading = false
					}
				}))
			},
			refundSuccess(){
				this.refundVisible = false
				this.$emit('refund-success')
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>