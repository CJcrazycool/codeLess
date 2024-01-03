<template>
	<div class="order-steps">
		<!-- 退款处理中 -->
		<el-steps v-if="refundOrder.state=='PENDING'" class="order-steps" :active="1" align-center>
			<el-step title="申请退款" :description="refundOrder.applyTime" status="success"></el-step>
			<el-step title="处理中" description="退款处理中"></el-step>
			<el-step title="退款成功"></el-step>
		</el-steps>

		<!-- 同意退款/退款中 -->
		<el-steps v-else-if="refundOrder.state=='CONSENT_REFUND' && (refundOrder.refundState == 'REFUND_PENDING' || refundOrder.refundState == 'NO_REFUND')" class="order-steps" :active="2" align-center>
			<el-step title="申请退款" :description="refundOrder.applyTime" status="success"></el-step>
			<el-step title="同意退款" status="success">
				<template slot="description">{{refundOrder.consentTime}}
					<template v-if="refundOrder.refundMessage">
						<br/><el-popover placement="right" title="退款留言" trigger="click" :content="refundOrder.refundMessage">
								<span slot="reference" class="link">查看留言</span>
							</el-popover>
					</template>
				</template>
			</el-step>
			<el-step title="退款中"></el-step>
		</el-steps>

		<!-- 同意退款/退款成功 -->
		<el-steps v-else-if="refundOrder.state=='CONSENT_REFUND' && refundOrder.refundState == 'REFUND'" class="order-steps" :active="3" align-center>
			<el-step title="申请退款" :description="refundOrder.applyTime" status="success"></el-step>
			<el-step title="同意退款" :description="refundOrder.consentTime" status="success">
				<template slot="description">{{refundOrder.consentTime}}
					<template v-if="refundOrder.refundMessage">
						<br/><el-popover placement="right" title="退款留言" trigger="click" :content="refundOrder.refundMessage">
								<span slot="reference" class="link">查看留言</span>
							</el-popover>
					</template>
				</template>
			</el-step>
			<el-step title="退款成功" :description="refundOrder.refundTime" status="success"></el-step>
		</el-steps>

		<!-- 同意退款/退款失败 -->
		<el-steps v-else-if="refundOrder.state=='CONSENT_REFUND' && refundOrder.refundState == 'REFUND_FAIL'" class="order-steps" :active="2" align-center>
			<el-step title="申请退款" :description="refundOrder.applyTime" status="success"></el-step>
			<el-step title="同意退款" :description="refundOrder.consentTime" status="success">
				<template slot="description">{{refundOrder.consentTime}}
					<template v-if="refundOrder.refundMessage">
						<br/><el-popover placement="right" title="退款留言" trigger="click" :content="refundOrder.refundMessage">
								<span slot="reference" class="link">查看留言</span>
							</el-popover>
					</template>
				</template>
			</el-step>
			<el-step title="退款失败"status="error">
				<template slot="description">{{refundOrder.failTime}}
					<template v-if="refundOrder.failReason">
						<br/><el-popover placement="right" title="失败原因" trigger="click" :content="refundOrder.failReason">
								<span slot="reference" class="link">失败原因</span>
							</el-popover>
					</template>
				</template>
			</el-step>
		</el-steps>

		<!-- 驳回退款 -->
		<el-steps v-else-if="refundOrder.state=='REJECTION'" class="order-steps" :active="1" align-center>
			<el-step title="申请退款" :description="refundOrder.applyTime" status="success"></el-step>
			<el-step title="驳回退款" status="error">
				<template slot="description">{{refundOrder.rejectionTime}}
					<template v-if="refundOrder.rejectionReason">
						<br/><el-popover placement="right" title="驳回原因" trigger="click" :content="refundOrder.rejectionReason">
								<span slot="reference" class="link">查看原因</span>
							</el-popover>
					</template>
				</template>
			</el-step>
			<el-step title="退款成功"></el-step>
		</el-steps>
	</div>
</template>

<script>
	export default {
		props: {
			order: {},
			refundOrder: {}
		},
		data() {
			return {}
		},
		watch: {},
		computed: {},
		mounted() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	::v-deep .order-steps .el-steps {
		margin-bottom: 20px;
	}
</style>
