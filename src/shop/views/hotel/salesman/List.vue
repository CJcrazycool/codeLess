<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm" :select-rows.sync="selectRows"
				:load-request="salesManApi.pageList()" >
					<template slot="search">
						<el-form-item label="业务员名称">
							<el-input v-model="searchForm.name" placeholder="请填写业务员名称"></el-input>
						</el-form-item>
						<el-form-item>
							<dropdownInput :options="queryOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
					</template>
					<template slot="operate">
						<div class="tip">如需获取最新数据，请前往<el-button type="text" @click="$router.push('/system/data-syn/update')">系统直连</el-button>中进行更新</div>
					</template>
					<el-table-column label="业务员编码" min-width="200" prop="code"></el-table-column>
					<el-table-column label="业务员姓名" min-width="200" prop="name"></el-table-column>
					<el-table-column label="手机号" min-width="200" prop="mobile"></el-table-column>
					<el-table-column label="所属分店代码" min-width="200" prop="hotelCode"></el-table-column>
					<el-table-column label="所属分店名称" min-width="200" prop="hotelName"></el-table-column>
					<el-table-column label="创建时间" prop="createTime" min-width="200"></el-table-column>
				</tableView>
			</div>
		</div>
	</div>
</template>

<script>
	import salesManApi from '@shop/api/salesMan'
	
	export default {
		components:{
		},
		data() {
			return {
				queryOptions:[
					{
						name:'hotelName',
						label:'分店名称'
					},
					{
						name:'hotelCode',
						label:'分店代码'
					}
				],
				salesManApi,
				searchForm: {
					name:'',
					hotelName: '',
					hotelCode:''
				},
				selectRows: []
			}
		},
		computed: {
		},
		created() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
</style>