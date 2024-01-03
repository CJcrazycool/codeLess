<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<roomOrderTableView ref="table" row-key="id" size="small" :search-form="searchForm"
				:load-request="roomOrderApi.pageList()">
					<template slot="search">
						<el-form-item>
							<dropdownInput :options="queryOrderOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item>
							<dropdownInput :options="queryContactsOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item label="预订酒店">
							<el-select v-model="searchForm.hotelCode" placeholder="请选择预订酒店" :clearable="true">
							    <el-option
							      v-for="item in hotelList"
							      :key="item.id"
							      :label="item.name"
							      :value="item.code">
							    </el-option>
							  </el-select>
						</el-form-item>
						<el-form-item label="退款状态">
							<dictSelect dict-key="after_sale_state" v-model="searchForm.afterSaleState" placeholder="请选择退款状态" :clearable="true"></dictSelect>
						</el-form-item>
						<el-form-item label="下单时间">
							<dateRange :begin-value.sync="searchForm.startDate" :end-value.sync="searchForm.endDate"></dateRange>
						</el-form-item>
					</template>
					<el-tabs slot="state" v-model="stateActive" :before-leave="stateBeforeLeave">
						<el-tab-pane label="全部订单" name="all"></el-tab-pane>
						<!-- <el-tab-pane label="待付款" name="WAIT_PAY"></el-tab-pane> -->
						<!-- <el-tab-pane label="预订中" name="RESERVE"></el-tab-pane> -->
						<el-tab-pane label="待入住" name="WAIT_CHECK_IN"></el-tab-pane>
						<el-tab-pane label="已完成" name="FINISH"></el-tab-pane>
						<el-tab-pane label="预订失败" name="RESERVE_FAIL"></el-tab-pane>
						<!-- <el-tab-pane label="交易关闭" name="CLOSE"></el-tab-pane> -->
						<el-tab-pane label="已取消" name="CANCEL"></el-tab-pane>
					</el-tabs>
					<template v-slot:operate="scope">
						<el-button size="small" type="text" @click="detail(scope.row)">查看</el-button>
					</template>
				</roomOrderTableView>
			</div>
		</div>
	</div>
</template>

<script>
	import roomOrderApi from '@shop/api/roomOrder'
	import hotelApi from '@shop/api/hotel'
	import roomOrderTableView from '@shop/components/RoomOrderTableView'
	import {formatter} from '@public/js/util'
	import {dateHelper} from '@public/js/util'

	export default {
		components:{
			roomOrderTableView
		},
		data() {
			return {
				roomOrderApi,
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
				queryContactsOptions:[
					{
						name:'contactName',
						label:'住客姓名'
					},
					{
						name:'mobile',
						label:'联系手机'
					}
				],
				searchForm: {
					orderSn:'',
					paySn:'',
					contactName:'',
					mobile:'',
					hotelCode:'',
					startDate:'',
					endDate:'',
					orderState:null,
					afterSaleState:''
				},
				hotelList:[],
				stateActive:'all'
			}
		},
		computed: {
		},
		created() {
			this.loadQueryParams(this.$route.query)
			this.loadHotel()
			var defaultDateRange = dateHelper.getRecentDayRange(90)
			this.searchForm.startDate = formatter.getDateText(defaultDateRange.start)
			this.searchForm.endDate = formatter.getDateText(defaultDateRange.end)
		},
		methods: {
			loadQueryParams(params){
				var stateValue = {
					'wait':'WAIT_CHECK_IN',
					'fail':'RESERVE_FAIL'
				} [params.state]
				if(stateValue){
					this.searchForm.orderState = stateValue
					this.stateActive = stateValue
				}
			},
			loadHotel(){
				this.$request.load(hotelApi.queryHotelList({
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.hotelList = response.data.result
					}
				}))
			},
			stateBeforeLeave(name){
				var orderState = null
				if(name != 'all')
					orderState = name
				this.searchForm.orderState = orderState
				this.$refs.table.search()
			},
			detail(row){
				this.$router.openWindow({
					path:'./detail',
					query:{
						orderSn:row.orderSn
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
