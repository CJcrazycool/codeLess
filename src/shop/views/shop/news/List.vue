<template>
	<div class="page-panel page-panel-body">
		<tabHeader value="news"></tabHeader>
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="api.pageList()">
					<template slot="search">
						<el-form-item label="文章标题">
							<el-input v-model="searchForm.title" placeholder="请填写文章标题"></el-input>
						</el-form-item>
						<el-form-item label="文章分组">
							<newsGroupSelect v-model="searchForm.groupId" :clearable="true"></newsGroupSelect>
						</el-form-item>
						<el-form-item label="文章状态">
							<dictSelect dict-key="state" v-model="searchForm.state" placeholder="请选择文章状态" :clearable="true"></dictSelect>
						</el-form-item>
					</template>
					<template slot="operate">
						<el-button size="small" type="primary" @click="add">添加文章</el-button>
					</template>
					<el-table-column label="文章标题" min-width="200" prop="title"></el-table-column>
					<el-table-column label="文章分组" min-width="200" prop="groupName"></el-table-column>
					<el-table-column label="文章状态" prop="createTime" min-width="200">
						<template slot-scope="scope">
							<el-tag size="small" :type="$dataDict.value('state_color',scope.row.state)" effect="plain">{{scope.row.state_dictText}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime" min-width="200"></el-table-column>
					<el-table-column width="130" align="center">
						<template slot-scope="scope">
							<el-button slot="reference" type="text" size="small" @click="edit(scope.row)">编辑</el-button>
							<el-popconfirm @confirm="del(scope.row.id)" class="span_btn-text" title="确认删除？" placement="bottom-end">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
	</div>
</template>

<script>
	import newsApi from '@shop/api/news'
	import tabHeader from './Tab'
	import newsGroupSelect from '@shop/components/NewsGroupSelect'

	export default {
		components: {
			tabHeader,
			newsGroupSelect
		},
		data() {
			return {
				api:newsApi,
				searchForm: {
					title:'',
					groupId:'',
					state:''
				},
				selectRows: [],
				newsGroupList:[]
			}
		},
		computed: {
		},
		created() {
		},
		methods: {
			add(){
				this.$router.openWindow({
					path:'./save'
				})
			},
			edit(row){
				this.$router.openWindow({
					path:'./save',
					query:{
						id:row.id
					}
				})
			},
			del(id){
				this.$request.submit(newsApi.delete({
					params:{
						id
					},
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText:()=>{
						return '删除成功'
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
