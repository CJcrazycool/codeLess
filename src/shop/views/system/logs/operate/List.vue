<template>
	<div class="page-panel page-panel-body">
		<tab value="operate"></tab>
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="logApi.sysLogPageList()">
					<template slot="search">
						<el-form-item label="日志类型">
							<dictSelect dict-key="log_type" v-model="searchForm.logType" placeholder="日志类型"
										:clearable="true" style="width: 150px"></dictSelect>
						</el-form-item>
						<el-form-item label="操作类型">
							<dictSelect dict-key="operate_type" v-model="searchForm.operateType" placeholder="操作类型"
										:clearable="true" style="width: 150px"></dictSelect>
						</el-form-item>
						<el-form-item label="日志内容">
							<el-input v-model="searchForm.logContent" placeholder="日志内容"></el-input>
						</el-form-item>
						<el-form-item label="操作用户">
							<el-input v-model="searchForm.realname" placeholder="操作用户"></el-input>
						</el-form-item>
						<el-form-item label="记录时间">
							<dateRange :begin-value.sync="searchForm.startDate" :end-value.sync="searchForm.endDate"></dateRange>
						</el-form-item>
					</template>
					<el-table-column label="日志类型" min-width="100" prop="logType_dictText">
					</el-table-column>
					<el-table-column label="操作类型" min-width="100" prop="operateType_dictText">
					</el-table-column>
					<el-table-column label="请求类型" min-width="100" prop="requestType">
					</el-table-column>
					<el-table-column label="操作用户" min-width="100" prop="realname">
					</el-table-column>
					<el-table-column label="日志内容" min-width="300" prop="logContent" show-overflow-tooltip>
					</el-table-column>
					<el-table-column label="耗时（ms）" min-width="100" prop="costTime">
					</el-table-column>
					<el-table-column label="记录时间" prop="createTime" min-width="200"></el-table-column>

					<el-table-column width="100" align="center">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="view(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>

		<el-drawer :append-to-body="true" title="查看日志" :visible.sync="viewVisible" size="800px" @open="viewAlive=true" @closed="viewAlive=false">
			<ViewForm v-if="viewAlive" @cancel="viewVisible=false" :id="currRow.id"></ViewForm>
		</el-drawer>

	</div>
</template>

<script>
	import logApi from '@shop/api/logs'
	import ViewForm from './ViewForm'
	import tab from '../Tab'

	export default {
		components: {
			ViewForm,
			tab
		},
		data() {
			return {
				logApi,
				selectRows: [],
				viewVisible:false,
				viewAlive:false,
				searchForm:{
					startDate:'',
					endDate:''
				},
				currRow:null
			}
		},
		computed: {

		},
		created() {

		},
		methods: {
			view(row){
				this.currRow = row
				this.viewVisible = true
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
