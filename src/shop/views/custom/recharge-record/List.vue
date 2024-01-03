<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="rechargeOrderApi.pageList()">
					<template slot="search">
						<el-form-item>
							<dropdownInput :options="queryOrderOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item>
							<dropdownInput :options="queryMemberOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item label="充值状态">
							<dictSelect dict-key="recharge_order_state" v-model="searchForm.orderState" placeholder="请选择充值状态" :clearable="true"
								:black-list="['WAIT_PAY']"></dictSelect>
						</el-form-item>
						<el-form-item label="支付时间">
							<dateRange :begin-value.sync="searchForm.startPayTime" :end-value.sync="searchForm.endPayTime"></dateRange>
						</el-form-item>
					</template>
					<el-table-column label="充值单号" min-width="200" prop="orderSn"></el-table-column>
					<el-table-column label="支付单号" min-width="200" prop="paySn"></el-table-column>
					<el-table-column label="支付金额" min-width="200">
						<template slot-scope="scope">
							支付金额 {{$formatter.price(scope.row.payPrice)}}<br/>
							<span class="text-danger" v-if="scope.row.totalRefund>0">退款金额 {{$formatter.price(scope.row.totalRefund)}}</span>
							<span v-else class="text-secondary">无退款</span>
						</template>
					</el-table-column>
					<el-table-column label="充值状态" min-width="200">
						<template slot-scope="scope">
							<span :class="{'text-success':scope.row.orderState=='FINISH','text-danger':scope.row.orderState=='RECHARGE_FAIL'}">{{scope.row.orderState_dictText}}</span>
						</template>
					</el-table-column>
					<el-table-column label="充值会员卡" min-width="200">
						<template slot-scope="scope">
							{{scope.row.mbrCardTypeName}}<br/><span class="text-secondary">{{scope.row.mbrCardNo}}</span>
						</template>
					</el-table-column>
					<el-table-column label="手机号" min-width="200" prop="mobile"></el-table-column>
					<el-table-column label="支付时间" prop="payTime" min-width="200"></el-table-column>
					<el-table-column width="100" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="detail(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
		<el-drawer :append-to-body="true" title="充值详情" :visible.sync="detailVisible" size="700px" @open="detailAlive=true" @closed="detailAlive=false">
			<detailForm @refund-success="refundSuccess" :id="currRow.orderSn" v-if="detailAlive" @cancel="detailVisible=false"></detailForm>
		</el-drawer>
	</div>
</template>

<script>
	import rechargeOrderApi from '@shop/api/rechargeOrder'
	import detailForm from './Detail'

	export default {
		components: {
			detailForm
		},
		data() {
			return {
				rechargeOrderApi,
				queryOrderOptions:[
					{
						name:'orderSn',
						label:'充值单号'
					},
					{
						name:'paySn',
						label:'支付单号'
					}
				],
				queryMemberOptions:[
					{
						name:'mbrCardNo',
						label:'会员卡号'
					},
					{
						name:'mobile',
						label:'手机号'
					}
				],
				selectRows: [],
				searchForm:{
					orderSn:'',
					paySn:'',
					mbrCardNo:'',
					mobile:'',
					orderState:null,
					startPayTime:'',
					endPayTime:''
				},
				currRow: null,
				detailVisible:false,
				detailAlive:false
			}
		},
		computed: {
		},
		created() {},
		methods: {
			detail(row) {
				this.detailVisible = true
				this.currRow = row
			},
			refundSuccess(){
				this.detailVisible = false
				this.$refs.table.reloadData()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
