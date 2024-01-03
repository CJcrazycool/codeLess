<template>
	<innerPageLayout class="room-order-detail">
		<div class="inner-page-center">
			<div v-if="loading == 1" class="loading" v-loading="true"></div>
			<template v-else>
				<div class="inner-page-title">
					<div class="title-text">退款详情</div>
					<div class="order-num">
						退款编号：{{refundOrder.refundSn}}<copyText class="span_left" :text="refundOrder.refundSn"></copyText>
					</div>
					<div class="order-num">
						订单编号：<span class="link" @click="orderDetail(order.orderSn)">{{order.orderSn}}</span><copyText class="span_left" :text="order.orderSn"></copyText>
					</div>
				</div>
				<el-alert v-if="refundOrder.state=='PENDING'" show-icon :closable="false" type="warning" class="order-alert">
					<template slot="title">请尽快处理售后退款，避免产生客人投诉</template>
				</el-alert>
				<el-alert v-if="refundOrder.state == 'CONSENT_REFUND' && refundOrder.refundState =='REFUND_FAIL'" show-icon :closable="false" type="error" class="order-alert">
					<template slot="title">退款失败，请重新审核退款</template>
				</el-alert>
				<roomRefundOrderStateStep :order="order" :refund-order="refundOrder"></roomRefundOrderStateStep>
				<div class="pay-info">
					<div class="title-text">
						支付信息
					</div>
					<div class="pay-num">
						支付单号：{{order.paySn}}<copyText class="span_left" :text="order.paySn"></copyText>
					</div>
					<roomOrderPayDetail :order="order"></roomOrderPayDetail>
					<div class="price-detail">
						<template v-if="order.couponAmount>0">
							<div class="price-item">应收总价：{{$formatter.price(order.totalPrice)}}</div>
							<div v-if="order.couponAmount>0" class="price-item">单笔优惠：-{{$formatter.price(order.couponAmount)}}<template v-if="order.couponName">（{{order.couponName}}）</template></div>
						</template>
						<div class="sum-price">
							<el-tag class="pay-type" size="small" effect="plain">{{order.payType_EnumText}}</el-tag>实收金额：<span class="num">{{$formatter.price(order.payPrice)}}</span>
							<el-tag class="pay-type refund-price" size="small" effect="plain">{{refundOrder.applyType_dictText}}</el-tag><span>退款金额：<span class="num">{{$formatter.price(refundOrder.refundFee)}}</span></span>
						</div>
						<div class="price-operate">
							<!-- 当状态为退款处理中，或者同意退款 && 退款失败时，则需要重新操作退款 -->
							<template v-if="refundOrder.state =='PENDING' || 
							(refundOrder.state == 'CONSENT_REFUND' && (refundOrder.refundState =='REFUND_FAIL' || refundOrder.refundState =='NO_REFUND'))">
								<el-button v-permission="'order:hotelOrderRefund:examine'" size="small" type="danger" @click="agreeVisible=true">同意退款</el-button>
								<el-button v-permission="'order:hotelOrderRefund:examine'" size="small" @click="rejectVisible=true">驳回退款</el-button>
							</template>
							<!-- <el-button size="small" @click="rollbackVisible=true">优惠退还</el-button> -->
						</div>
					</div>
					
				</div>
				<el-descriptions title="退款信息" class="desc-view card" :colon="false" :column="2">
					<el-descriptions-item label="联系手机">{{refundOrder.mobile}}</el-descriptions-item>
					<el-descriptions-item label="退款原因">{{refundOrder.refundReason}}</el-descriptions-item>
					<el-descriptions-item label="退款说明">{{refundOrder.refundExplain}}</el-descriptions-item>
				</el-descriptions>
			</template>
		</div>
		<!-- 同意退款 -->
		<el-dialog :append-to-body="true" title="同意退款" :visible.sync="agreeVisible" @open="agreeAlive=true" @closed="agreeAlive=false" width="640px">
			<agreeForm v-if="agreeAlive" @cancel="agreeVisible=false" :order="order" :refund-order="refundOrder" @success="agreeSuccess"></agreeForm>
		</el-dialog>
		<!-- 驳回退款 -->
		<el-dialog :append-to-body="true" title="驳回退款" :visible.sync="rejectVisible" @open="rejectAlive=true" @closed="rejectAlive=false" width="640px">
			<rejectForm v-if="rejectAlive" @cancel="rejectVisible=false" :refund-order="refundOrder" @success="rejectSuccess"></rejectForm>
		</el-dialog>
		<!-- 退还优惠权益 -->
		<!-- <el-dialog :append-to-body="true" title="优惠退还" :visible.sync="rollbackVisible" width="640px">
			<el-table size="mini" :data="rollbackData">
			  <el-table-column prop="date" label="退还记录">
				  <template slot-scope="scope">
					<el-tag size="mini" effect="plain">手动退还</el-tag><span class="span_left">新客￥5优惠券</span>
				  </template>
			  </el-table-column>
			  <el-table-column prop="name" label="退还时间">
				  <template slot-scope="scope">
					2023-10-12 20:00:00
				  </template>
			  </el-table-column>
			</el-table>
			<div class="dialog-footer">
				<el-button size="small" @click="rollbackVisible=false">取消</el-button>
			</div>
			<el-form class="dialog-form" @submit.native.prevent ref="form" size="small" :rules="rules">
				<div class="form-body">
					<div class="form-area">
						<el-row>
						  <el-form-item label="退还优惠券" prop="name">
							 <el-checkbox :value="true">新客￥5优惠券</el-checkbox>
						  </el-form-item>
						</el-row>
						<el-row>
						  <el-form-item label="退还积分" prop="name">
							  <el-input-number class="num-input-danger" :min="1" label="退款金额" :value="60" :precision="0" :controls="false"></el-input-number><span class="span_left rollback-max-score">/ 60</span>
						  </el-form-item>
						</el-row>
					</div>
				</div>
				<div class="form-footer">
					<el-button native-type="submit" size="small" type="danger">确认退还</el-button>
					<el-button size="small" @click="rollbackVisible=false">取消</el-button>
				</div>
			</el-form>
		</el-dialog> -->
	</innerPageLayout>
</template>

<script>
	import roomRefundOrderApi from '@shop/api/roomRefundOrder'
	import innerPageLayout from '@shop/components/InnerPageLayout'
	import roomRefundOrderStateStep from '@shop/components/RoomRefundOrderStateStep'
	import roomOrderPayDetail from '@shop/components/RoomOrderPayDetail'
	import rejectForm from './Reject'
	import agreeForm from './Agree'
	
	export default {
		components:{
			innerPageLayout,
			roomRefundOrderStateStep,
			rejectForm,
			agreeForm,
			roomOrderPayDetail
		},
		data() {
			return {
				loading:0,
				order:null,
				refundOrder:null,
				rejectVisible:false,
				rejectAlive:false,
				agreeVisible:false,
				agreeAlive:false,
				rollbackVisible:false,
				rollbackData:[
					{}
				],
			}
		},
		watch: {
		},
		computed: {},
		created() {
			this.loadRefundOrder(this.$route.query.refundSn)
		},
		methods: {
			loadRefundOrder(refundSn){
				this.$request.load(roomRefundOrderApi.queryById({
					params: {
						refundSn
					},
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.order = response.data.result.hotelOrder
						this.refundOrder = response.data.result.refundOrder
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			orderDetail(orderSn){
				this.$router.openWindow({
					path:'../room-order/detail',
					query:{
						orderSn
					}
				})
			},
			rejectSuccess(){
				this.rejectVisible = false
				this.loadRefundOrder(this.$route.query.refundSn)
			},
			agreeSuccess(){
				this.agreeVisible = false
				this.loadRefundOrder(this.$route.query.refundSn)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rollback-max-score{
		font-size: $--font-size-extra-small;
	}
	
</style>