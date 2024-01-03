<template>
	<innerPageLayout class="room-order-detail">
		<div class="inner-page-center">
			<div v-if="loading == 1" class="loading" v-loading="true"></div>
			<template v-else-if="loading==2">
				<div class="inner-page-title">
					<div class="title-text">订单详情</div>
					<div class="order-num">
						订单编号：{{order.orderSn}}<copyText class="span_left" :text="order.orderSn"></copyText>
					</div>
				</div>
				<el-alert v-if="order.orderState == 'RESERVE_FAIL' && order.syncStatus == 'SYNC_FAIL' && order.payState !='REFUND'" show-icon :closable="false" type="error" class="order-alert">
					<template slot="title">预订系统接单失败，点击尝试<el-popconfirm title="确认重试？" @confirm="retryPushOrder" placement="bottom-start">
							<el-button class="alert-text-button" slot="reference" size="mini" type="text" :loading="pushOrderLoading">重新预订</el-button>
						</el-popconfirm>
					</template>
				</el-alert>
				<roomOrderStateStep v-if="order" :order="order"></roomOrderStateStep>
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
						<div class="sum-price"><el-tag class="pay-type" size="small" effect="plain">{{order.payType_EnumText}}</el-tag>实收金额：<span class="num">{{$formatter.price(order.payPrice)}}</span></div>
						<!-- 付款成功或者部分退款状态下，才可以申请退款 -->
						<div v-permission="'order:hotelOrder:refund'" class="price-operate" v-if="order.payState == 'FINISH' || order.payState == 'PARTIAL_REFUND'">
							<template v-if="pendingRefund!==false">
								<!-- 当没有进行中状态的退款 && 订单状态非预订状态中，则显示申请退款按钮 -->
								<el-button v-if="pendingRefund==null && order.orderState != 'RESERVE'" size="small" type="danger" @click="refundVisible=true">申请退款</el-button>
								<!-- 当有进行中状态的退款时，则显示退款详情 -->
								<el-button v-else-if="pendingRefund" size="small" type="danger" @click="refundDetail(pendingRefund)">退款处理中</el-button>
							</template>
						</div>
					</div>
				</div>
				<el-descriptions title="预订信息" class="desc-view card" :colon="false" :column="2">
					<el-descriptions-item label="住客姓名">{{order.contactName}}</el-descriptions-item>
					<el-descriptions-item label="联系手机">{{order.mobile}}</el-descriptions-item>
					<el-descriptions-item label="入住时间">{{order.arriveDate}}  抵店 ~ {{order.leaveDate}} 离店</el-descriptions-item>
					<el-descriptions-item label="客人备注">{{order.remark}}</el-descriptions-item>
				</el-descriptions>
				<div class="refund-info">
					<div class="title-text">
						退款信息
					</div>
					<tableView class="refund-detail-table":data="refundOrders" size="small">
						<el-table-column label="退款编号">
							<template slot-scope="scope">
								<span @click="refundDetail(scope.row.refundSn)" class="link">{{scope.row.refundSn}}</span>
							</template>
						</el-table-column>
					<el-table-column label="申请方式" prop="applyType_dictText"></el-table-column>
					  <el-table-column label="申请时间" prop="applyTime"></el-table-column>
					  <el-table-column label="退款状态" prop="refundStateName">
						  <template slot-scope="scope">
							<span class="text-danger">{{scope.row.refundStateName}}</span>
						  </template>
					  </el-table-column>
					  <el-table-column label="退款金额">
						<template slot-scope="scope">
							{{$formatter.price(scope.row.refundFee)}}
						</template>
					  </el-table-column>
					</tableView>
				</div>
			</template>
		</div>
		<!-- 代客申请退款 -->
		<el-dialog :append-to-body="true" title="申请退款" width="640px"
			:visible.sync="refundVisible" @open="refundAlive=true" @closed="refundAlive=false">
			<refundForm v-if="refundAlive" @cancel="refundVisible=false" :order="order" @success="refundSuccess"></refundForm>
		</el-dialog>
	</innerPageLayout>
</template>

<script>
	import innerPageLayout from '@shop/components/InnerPageLayout'
	import roomOrderApi from '@shop/api/roomOrder'
	import roomRefundOrderApi from '@shop/api/roomRefundOrder'
	import roomOrderStateStep from '@shop/components/RoomOrderStateStep'
	import roomOrderPayDetail from '@shop/components/RoomOrderPayDetail'
	import refundForm from './Refund'
	
	export default {
		components:{
			innerPageLayout,
			roomOrderStateStep,
			roomOrderPayDetail,
			refundForm
		},
		data() {
			return {
				loading:0,
				order:null,
				refundOrders:[],
				refundVisible:false,
				refundAlive:false,
				pendingRefund:false,
				pushOrderLoading:false
			}
		},
		watch: {
		},
		computed: {},
		created() {
			this.load()
		},
		methods: {
			load(){
				this.loadOrder(this.$route.query.orderSn)
				this.loadPendingRefund(this.$route.query.orderSn)
			},
			loadPendingRefund(orderSn){
				this.$request.load(roomRefundOrderApi.queryPendingOrder({
					params: {
						orderSn
					},
					success:(response)=>{
						this.pendingRefund = response.data.result
					}
				}))
			},
			loadOrder(orderSn){
				this.$request.load(roomOrderApi.queryById({
					params: {
						orderSn
					},
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.order = response.data.result.hotelOrder
						this.refundOrders = response.data.result.refundOrders
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			retryPushOrder(){
				this.$request.submit(roomOrderApi.pushOrder({
					params:{
						orderSn:this.order.orderSn
					},
					before: () => {
						this.pushOrderLoading = true
					},
					showSuccessMessage:false,
					success: (response) => {
						if(!response.data.success)
							throw new Error()
						this.$alert('正在重新尝试预订，请刷新查看预订结果', '提示', {
							confirmButtonText: '查看结果',
							type: 'success',
							center: true,
							beforeClose: (action, instance, done) => {
								done()
								this.load()
							}
						})
					},
					complete: () => {
						this.pushOrderLoading = false
					}
				}))
			},
			refundSuccess(){
				this.refundVisible = false
				this.load()
			},
			refundDetail(refundSn){
				this.$router.openWindow({
					path:'../room-refund/detail',
					query:{
						refundSn
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>