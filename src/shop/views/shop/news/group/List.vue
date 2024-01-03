<template>
	<div class="page-panel page-panel-body">
		<tabHeader value="group"></tabHeader>
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="api.pageList()">
					<template slot="search">
						<el-form-item label="分组名称">
							<el-input v-model="searchForm.name" placeholder="请填写分组名称"></el-input>
						</el-form-item>
					</template>
					<template slot="operate">
						<el-button size="small" type="primary" @click="addVisible=true">添加分组</el-button>
					</template>
					<el-table-column label="文章分组" min-width="200" prop="name"></el-table-column>
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
		<el-dialog :append-to-body="true" title="添加分组" :visible.sync="addVisible" width="600px"
		 @open="addAlive=true" @closed="addAlive=false">
			<saveForm v-if="addAlive" @save="saveSuccess" @cancel="addVisible=false"></saveForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="编辑分组" :visible.sync="editVisible" width="600px"
		 @open="editAlive=true" @closed="editAlive=false">
			<saveForm v-if="editAlive" :id="currRow?currRow.id:null" @save="saveSuccess" @cancel="editVisible=false"></saveForm>
		</el-dialog>
	</div>
</template>

<script>
	import newsGroupApi from '@shop/api/newsGroup'
	import saveForm from './Save'
	import tabHeader from '../Tab'

	export default {
		components: {
			tabHeader,
			saveForm
		},
		data() {
			return {
				api:newsGroupApi,
				searchForm: {
					name:''
				},
				selectRows: [],
				addVisible:false,
				addAlive:false,
				editVisible:false,
				editAlive:false,
				currRow:null,
			}
		},
		computed: {
		},
		created() {
		},
		methods: {
			saveSuccess() {
				this.addVisible = false
				this.editVisible = false
				this.$refs.table.reloadData()
			},
			add(){
				this.$router.openWindow({
					path:'./save'
				})
			},
			edit(row){
				this.currRow = row
				this.editVisible = true
			},
			del(id){
				this.$request.submit(newsGroupApi.delete({
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
