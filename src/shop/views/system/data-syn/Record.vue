<template>
	<div class="page-panel page-panel-body">
		<tabHeader value="record"></tabHeader>
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="api.recordPageList()">
					<template slot="search">
						<el-form-item label="开始时间">
							<dateRange :begin-value.sync="searchForm.startDate" :end-value.sync="searchForm.endDate"></dateRange>
						</el-form-item>
					</template>
					<el-table-column label="更新类型" min-width="200" prop="type_EnumText"></el-table-column>
					<el-table-column label="更新状态" min-width="200" prop="success_dictText">
						<template slot-scope="scope">
							<el-tag size="small" :type="$dataDict.value('direct_state_color',scope.row.success)" effect="plain">{{scope.row.success_dictText}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="更新耗时（ms）" min-width="200" prop="expend"></el-table-column>
					<el-table-column label="开始时间" prop="startTime" min-width="200"></el-table-column>
					<el-table-column label="完成时间" prop="endTime" min-width="200"></el-table-column>
				</tableView>
			</div>
		</div>
	</div>
</template>

<script>
	import tabHeader from './Tab'
	import systemDataSynApi from '@shop/api/systemDataSyn'

	export default {
		components:{
			tabHeader
		},
		props:{
		},
		data() {
			return {
				api:systemDataSynApi,
				searchForm:{
					startDate:'',
					endDate:''
				},
				selectRows:null
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
</style>