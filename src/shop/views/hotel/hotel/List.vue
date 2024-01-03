<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm" :select-rows.sync="selectRows"
				:load-request="hotelApi.pageList()" >
					<template slot="search">
						<el-form-item>
							<dropdownInput :options="queryOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item label="酒店状态">
							<dictSelect dict-key="state" v-model="searchForm.state" placeholder="请选择酒店状态" :clearable="true"></dictSelect>
						</el-form-item>
					</template>
					<template slot="operate">
						<div class="tip">如需获取最新数据，请前往<el-button type="text" @click="$router.push('/system/data-syn/update')">系统直连</el-button>中进行更新</div>
					</template>
					<el-table-column label="酒店" min-width="200">
						<template slot-scope="scope">
							<thumbInfo img-fit="cover" :image-url="$stringHelper.toArrayIndex(scope.row.homePicture)">
								<template slot="title">
									{{scope.row.name}}
								</template>
								<template slot="desc">
									{{scope.row.code}}
								</template>
							</thumbInfo>
						</template>
					</el-table-column>
					<el-table-column label="酒店别名" min-width="200" prop="anotherName"></el-table-column>
					<el-table-column label="酒店状态" min-width="200">
						<template slot-scope="scope">
							<el-tag size="small" :type="$dataDict.value('state_color',scope.row.state)" effect="plain">
								{{scope.row.state_dictText}}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime" min-width="200"></el-table-column>
					<el-table-column width="100" align="center">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
	</div>
</template>

<script>
	import hotelApi from '@shop/api/hotel'
	
	export default {
		components:{
		},
		data() {
			return {
				queryOptions:[
					{
						name:'name',
						label:'酒店名称'
					},
					{
						name:'code',
						label:'酒店代码'
					}
				],
				hotelApi,
				searchForm: {
					name: '',
					code:'',
					state:null
				},
				selectRows: []
			}
		},
		computed: {
		},
		created() {
		},
		methods: {
			edit(row){
				this.$router.openWindow({
					path:'./edit',
					query:{
						id:row.id,
						code:row.code
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>