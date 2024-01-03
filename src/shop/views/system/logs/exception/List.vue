<template>
	<div class="page-panel page-panel-body">
		<tab value="exception"></tab>
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="logApi.sysExceptionLogPageList()">
					<template slot="search">
                        <el-form-item label="异常类型">
                            <el-input v-model="searchForm.exceptionType" placeholder="异常类型"></el-input>
                        </el-form-item>
                        <el-form-item label="接口类型">
                            <dictSelect dict-key="api_type" v-model="searchForm.apiType" placeholder="接口类型"
                                        :clearable="true" style="width: 150px"></dictSelect>
                        </el-form-item>
                        <el-form-item label="请求方式">
                            <dictSelect dict-key="method_type" v-model="searchForm.methodType" placeholder="请求方式"
                                        :clearable="true" style="width: 100px"></dictSelect>
                        </el-form-item>
                        <el-form-item label="会员ID">
                            <el-input v-model="searchForm.memberId" placeholder="会员ID"></el-input>
                        </el-form-item>
                        <el-form-item label="用户ID">
                            <el-input v-model="searchForm.userId" placeholder="用户ID"></el-input>
                        </el-form-item>
						<el-form-item label="记录时间">
							<dateRange :begin-value.sync="searchForm.startDate" :end-value.sync="searchForm.endDate"></dateRange>
						</el-form-item>
					</template>

					<el-table-column label="异常类型" min-width="200" prop="exceptionType" ></el-table-column>
					<el-table-column label="请求方式" min-width="50" prop="methodType"></el-table-column>
					<el-table-column label="接口类型" min-width="50" prop="apiType_dictText"></el-table-column>
<!--					<el-table-column label="url" min-width="200" prop="url" show-overflow-tooltip></el-table-column>-->
<!--					<el-table-column label="请求方法" min-width="200" prop="method" show-overflow-tooltip></el-table-column>-->
					<el-table-column label="异常信息" min-width="400" prop="message" show-overflow-tooltip></el-table-column>
					<el-table-column label="记录时间" prop="createTime" min-width="100"></el-table-column>
					<el-table-column width="100" align="center">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="view(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>

		<el-drawer :append-to-body="true" title="详情" :visible.sync="viewVisible" size="800px" @open="viewAlive=true" @closed="viewAlive=false">
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
