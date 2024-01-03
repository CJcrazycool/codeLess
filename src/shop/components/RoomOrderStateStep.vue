<template>
	<div class="order-steps">
		<!-- 非退款 -->
		<template v-if="order.payState != 'REFUND'">
			<!-- 待付款 -->
			<el-steps v-if="order.orderState == 'WAIT_PAY'" :active="1" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="待付款" description=""></el-step>
			  <el-step title="预订成功" description=""></el-step>
			  <el-step title="等待入住" description=""></el-step>
			  <el-step title="完成入住" description=""></el-step>
			</el-steps>
			<!-- 支付超时关闭 -->
			<el-steps v-else-if="order.orderState == 'CLOSE'" :active="1" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="交易关闭" status="error">
				  <template slot="description">
					  支付超时<br/>{{order.closeTime}}
				  </template>
			  </el-step>	 
			  <el-step title="预订成功" description=""></el-step>
			  <el-step title="等待入住" description=""></el-step>
			  <el-step title="完成入住" description=""></el-step>
			</el-steps>
			<!-- 预定中 -->
			<el-steps v-else-if="order.orderState == 'RESERVE'" :active="2" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="付款成功" :description="order.payTime" status="success"></el-step>
			  <el-step title="预订中" description="待酒店接单"></el-step>
			  <el-step title="等待入住" description=""></el-step>
			  <el-step title="完成入住" description=""></el-step>
			</el-steps>
			<!-- 预定失败 -->
			<el-steps v-else-if="order.orderState == 'RESERVE_FAIL'" :active="2" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="付款成功" :description="order.payTime" status="success"></el-step>
			  <el-step title="预订失败" :description="order.reserveFailTime" status="error">
				  <template slot="description">{{order.reserveFailTime}}
					  <template v-if="order.reserveFailReason">
					  <br/><el-popover placement="right" title="失败原因" trigger="click"
							:content="order.reserveFailReason">
							<span slot="reference" class="link">查看原因</span>
						</el-popover>
					  </template>
				  </template>
			  </el-step>
			  <el-step title="等待入住" description=""></el-step>
			  <el-step title="完成入住" description=""></el-step>
			</el-steps>
			<!-- 预定成功 -->
			<el-steps v-else-if="order.orderState == 'WAIT_CHECK_IN'" :active="3" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="付款成功" :description="order.payTime" status="success"></el-step>
			  <el-step title="预订成功" :description="order.reserveTime" status="success"></el-step>
			  <el-step title="等待入住" description=""></el-step>
			  <el-step title="完成入住" description=""></el-step>
			</el-steps>
			<!-- 系统取消订单 -->
			<el-steps v-else-if="order.orderState == 'CANCEL'" :active="2" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="付款成功" :description="order.payTime" status="success"></el-step>
			  <el-step title="取消订单" :description="order.cancelTime" status="error"></el-step>
			  <el-step title="等待入住" description=""></el-step>
			  <el-step title="完成入住" description=""></el-step>
			</el-steps>
			<!-- 完成入住 -->
			<el-steps v-else-if="order.orderState == 'FINISH'" :active="5" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="付款成功" :description="order.payTime" status="success"></el-step>
			  <el-step title="预订成功" :description="order.reserveTime" status="success"></el-step>
			  <el-step title="已入住" :description="order.finishTime" status="success"></el-step>
			  <el-step title="完成入住" description="交易完成" status="success"></el-step>
			</el-steps>
		</template>
		<!-- 整单退款情况 -->
		<template v-else>
			<!-- 预定成功，整单退款成功 -->
			<el-steps v-if="order.orderState == 'WAIT_CHECK_IN'" :active="3" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="付款成功" :description="order.payTime" status="success"></el-step>
			  <el-step title="预订成功" :description="order.reserveTime" status="success"></el-step>
			  <el-step title="未入住" status="error">
				  <template slot="description">
					  退款成功<br/>{{order.refundTime}}
				  </template>
			  </el-step>
			</el-steps>
			<!-- 预定失败，整单退款成功-->
			<el-steps v-else-if="order.orderState == 'RESERVE_FAIL'" :active="2" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="付款成功" :description="order.payTime" status="success"></el-step>
			  <el-step title="预订失败" status="error">
				  <template slot="description">{{order.reserveFailTime}}
					  <template v-if="order.reserveFailReason">
						  <br/><el-popover placement="right" title="失败原因" trigger="click"
								:content="order.reserveFailReason">
								<span slot="reference" class="link">查看原因</span>
							</el-popover>
					  </template>
				</template>
			  </el-step>
			  <el-step title="未入住" status="error">
				  <template slot="description">
					  退款成功<br/>{{order.refundTime}}
				  </template>
			  </el-step>
			</el-steps>
			<!-- 预定中，整单退款成功-->
			<el-steps v-else-if="order.orderState == 'RESERVE'" :active="2" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="付款成功" :description="order.payTime" status="success"></el-step>
			  <el-step title="取消预订" description="酒店未接单" status="error"></el-step>
			  <el-step title="未入住" status="error">
				  <template slot="description">
					  退款成功<br/>{{order.refundTime}}
				  </template>
			  </el-step>
			</el-steps>
			<!-- 线下取消订单，整单退款成功-->
			<el-steps v-else-if="order.orderState == 'CANCEL'" :active="2" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="付款成功" :description="order.payTime" status="success"></el-step>
			  <el-step title="取消订单" :description="order.cancelTime" status="error"></el-step>
			  <el-step title="未入住" status="error">
				  <template slot="description">
					  退款成功<br/>{{order.refundTime}}
				  </template>
			  </el-step>
			</el-steps>
			<!-- 完成入住，整单退款成功 -->
			<el-steps v-else-if="order.orderState == 'FINISH'" :active="5" align-center>
			  <el-step title="提交订单" :description="order.createTime" status="success"></el-step>
			  <el-step title="付款成功" :description="order.payTime" status="success"></el-step>
			  <el-step title="预订成功" :description="order.reserveTime" status="success"></el-step>
			  <el-step title="已入住" :description="order.finishTime" status="success"></el-step>
			  <el-step title="完成入住" description="" status="error">
				  <template slot="description">
					  退款成功<br/>{{order.refundTime}}
				  </template>
			  </el-step>
			</el-steps>
		</template>
	</div>
</template>

<script>
	export default {
		props:{
			order:{}
		},
		data() {
			return {
			}
		},
		watch: {
		},
		computed: {
		},
		mounted() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .order-steps .el-steps{
		margin-bottom:20px;
	}
</style>