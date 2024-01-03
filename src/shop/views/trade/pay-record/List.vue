<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="payApi.pageList()">
					<template slot="search">
						<el-form-item>
							<dropdownInput :options="queryOrderOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item label="支付状态">
							<dictSelect dict-key="pay_order_state" v-model="searchForm.orderState" placeholder="请选择支付状态" :clearable="true"></dictSelect>
						</el-form-item>
						<el-form-item label="订单类型">
							<dictSelect dict-key="order_type" v-model="searchForm.orderType" placeholder="请选择订单类型" :clearable="true"></dictSelect>
						</el-form-item>
						<el-form-item label="创建时间">
							<dateRange :begin-value.sync="searchForm.startDate" :end-value.sync="searchForm.endDate"></dateRange>
						</el-form-item>
						<el-form-item label="支付时间">
							<dateRange :begin-value.sync="searchForm.startPayTime" :end-value.sync="searchForm.endPayTime"></dateRange>
						</el-form-item>
					</template>
					<el-table-column label="支付单号" min-width="200" prop="paySn"></el-table-column>
					<el-table-column label="外部交易单号" min-width="280" prop="tradeSn"></el-table-column>
					<el-table-column label="支付通道" min-width="150" prop="payType_EnumText"></el-table-column>
					<el-table-column label="支付金额" min-width="200">
						<template slot-scope="scope">
							支付金额 {{$formatter.price(scope.row.payPrice)}}
							<br/>
							<span class="text-danger" v-if="scope.row.totalRefund>0"s>退款金额 {{$formatter.price(scope.row.totalRefund)}}</span>
							<span v-else class="text-secondary">无退款</span>
						</template>
					</el-table-column>
					<el-table-column label="支付状态" min-width="150" prop="orderState_EnumText"></el-table-column>
					<el-table-column label="订单类型" min-width="150" prop="orderType_EnumText"></el-table-column>
					<el-table-column label="创建时间" prop="createTime" min-width="200"></el-table-column>
					<el-table-column label="支付时间" prop="payTime" min-width="200"></el-table-column>
				</tableView>
			</div>
		</div>
	</div>
</template>

<script>
	import payApi from '@shop/api/pay'
	import {formatter} from '@public/js/util'
	import {dateHelper} from '@public/js/util'

	export default {
		components: {
		},
		data() {
			return {
				payApi,
				selectRows: [],
				queryOrderOptions:[
					{
						name:'paySn',
						label:'支付单号'
					},
					{
						name:'tradeSn',
						label:'外部交易单号'
					}
				],
				searchForm:{
					paySn:'',
					tradeSn:'',
					orderState:null,
					orderType:null,
					startDate:'',
					endDate:'',
					startPayTime:'',
					endPayTime:''
				}
			}
		},
		computed: {
		},
		created() {
			var defaultDateRange = dateHelper.getRecentDayRange(90)
			this.searchForm.startDate = formatter.getDateText(defaultDateRange.start)
			this.searchForm.endDate = formatter.getDateText(defaultDateRange.end)
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
</style>
