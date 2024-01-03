<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="tradeRecordApi.pageList()" @after-search="afterSearch">
					<template slot="search">
						<el-form-item label="资金流向">
							<el-checkbox-group v-model="searchForm.incomeExpenditureTypes">
								<el-checkbox :label="1" border>看收入</el-checkbox>
								<el-checkbox :label="0" border>看支出</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="入账时间">
							<dateRange :begin-value.sync="searchForm.startDate" :end-value.sync="searchForm.endDate"></dateRange>
						</el-form-item>
						<el-form-item>
							<dropdownInput :options="queryOrderOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item label="订单类型">
							<dictSelect dict-key="order_type" v-model="searchForm.orderTypes" placeholder="请选择订单类型" multiple collapse-tags :clearable="true"></dictSelect>
						</el-form-item>
						<el-form-item label="支付通道">
							<dictSelect dict-key="pay_type" :white-list="['WX_PAY','MEMBER_PAY','LCSW_PAY']" v-model="searchForm.payType" placeholder="请选择支付通道" :clearable="true"></dictSelect>
						</el-form-item>
					</template>
					<div slot="operate" class="sum-result">
						<div class="area-block-title">汇总结果</div>
						<div v-loading="totalDataLoading" class="sum-result-data">
							<div class="result-item">
								<div class="title">收入金额（元）</div>
								<div class="value text-success">+{{$formatter.price(totalData.incomeAmount)}}</div>
							</div>
							<div class="result-item">
								<div class="title">收入笔数</div>
								<div class="value">{{totalData.incomeNum}}</div>
							</div>
							<div class="result-item">
								<div class="title">支出金额（元）</div>
								<div class="value text-danger">{{$formatter.price(totalData.expenditureAmount)}}</div>
							</div>
							<div class="result-item">
								<div class="title">支出笔数</div>
								<div class="value">{{totalData.expenditureNum}}</div>
							</div>
							<div class="result-item">
								<div class="title">盈亏金额（元）</div>
								<div v-if="totalData.profit>0" class="value text-success">+{{$formatter.price(totalData.profit)}}</div>
								<div v-else-if="totalData.profit<=0" class="value text-danger">{{$formatter.price(totalData.profit)}}</div>
							</div>
						</div>
					</div>
					<el-table-column label="支付通道" min-width="160" prop="payType_EnumText"></el-table-column>
					<el-table-column label="入账时间" min-width="200" prop="createTime"></el-table-column>
					<el-table-column label="订单号" min-width="200" prop="orderSns"></el-table-column>
					<el-table-column label="支付单号" min-width="200" prop="paySn"></el-table-column>
					<el-table-column label="订单类型" min-width="160" prop="orderType_EnumText"></el-table-column>
					<el-table-column label="收支金额" min-width="160">
						<template slot-scope="scope">
							<span v-if="scope.row.amount>0" class="text-success">+{{$formatter.price(scope.row.amount)}}</span>
							<span v-else class="text-danger">{{$formatter.price(scope.row.amount)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="账单说明" min-width="250" prop="remark"></el-table-column>
				</tableView>
			</div>
		</div>
	</div>
</template>

<script>
	import tradeRecordApi from '@shop/api/tradeRecord'
	import {formatter} from '@public/js/util'
	import {dateHelper} from '@public/js/util'

	export default {
		components: {
		},
		data() {
			return {
				tradeRecordApi,
				selectRows: [],
				queryOrderOptions:[
					{
						name:'orderSn',
						label:'订单编号'
					},
					{
						name:'paySn',
						label:'支付单号'
					}
				],
				searchForm:{
					incomeExpenditureTypes:[1,0],
					orderSn:'',
					paySn:'',
					startDate:'',
					endDate:'',
					payChannel:null,
					payType:null,
					orderTypes:['HOTEL','TICKET']
				},
				totalData:{
					incomeAmount:0,
					incomeNum:0,
					expenditureAmount:0,
					expenditureNum:0,
					profit:0
				},
				totalDataLoading:false
			}
		},
		computed: {
		},
		created() {
			this.loadTotalData(this.searchForm)
			var defaultDateRange = dateHelper.getRecentDayRange(90)
			this.searchForm.startDate = formatter.getDateText(defaultDateRange.start)
			this.searchForm.endDate = formatter.getDateText(defaultDateRange.end)
		},
		methods: {
			loadTotalData(data){
				this.$request.load(tradeRecordApi.totalData({
					data,
					before:()=>{
						this.totalDataLoading = true
					},
					success: (response) => {
						if(!response.data.result)
							throw new Error()
						this.totalData = response.data.result
					},
					complete:()=>{
						this.totalDataLoading = false
					}
				}))
			},
			afterSearch(data){
				this.loadTotalData(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
