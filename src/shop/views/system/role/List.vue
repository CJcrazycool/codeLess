<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm" :select-rows.sync="selectRows"
				:load-request="systemRoleApi.pageList()" >
					<template slot="operate">
						<el-button size="small" type="primary" @click="addVisible=true">添加角色</el-button>
					</template>
					<el-table-column label="角色名称" prop="roleName" min-width="200" ></el-table-column>
					<el-table-column label="创建时间" prop="createTime" min-width="200"></el-table-column>
					<el-table-column label="备注" prop="description" min-width="200"></el-table-column>
					<el-table-column width="160" align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.isAdmin">
								<span class="text-secondary">不可编辑</span>
							</template>
							<template v-else>
								<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
								<el-button size="small" type="text" @click="authorization(scope.row)">授权</el-button>
								<el-popconfirm @confirm="del(scope.row.id)" class="span_btn-text" title="确认删除？"
									placement="bottom-end">
									<el-button slot="reference" type="text" size="small">删除</el-button>
								</el-popconfirm>
							</template>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>

		<el-dialog :append-to-body="true" title="添加角色" :visible.sync="addVisible" width="540px"
		 @open="addAlive=true" @closed="addAlive=false">
			<saveForm v-if="addAlive" @cancel="addVisible=false" @success="saveSuccess"></saveForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="编辑角色" :visible.sync="editVisible" width="540px"
		 @open="editAlive=true" @closed="editAlive=false">
			<saveForm v-if="editAlive" @cancel="editVisible=false" @success="saveSuccess" :id="currRow.id"></saveForm>
		</el-dialog>
		<el-drawer :append-to-body="true" title="角色授权" :visible.sync="authorizationVisible" size="600px"
		 @open="authorizationAlive=true" @closed="authorizationAlive=false">
			<authorization v-if="authorizationAlive" @cancel="authorizationVisible=false" @success="saveSuccess" :id="currRow.id"></authorization>
		</el-drawer>
		
	</div>
</template>

<script>
	import systemRoleApi from '@shop/api/systemRole'
	import saveForm from './Save'
	import authorization from './Authorization'
	
	
	export default {
		components:{
			saveForm,
			authorization,
		},
		data() {
			return {
				systemRoleApi,
				addVisible:false,
				addAlive:false,
				editVisible:false,
				editAlive:false,
				authorizationVisible:false,
				authorizationAlive:false,
				searchForm: {
					keyword: ''
				},
				selectRows: [],
				currRow:null
			}
		},
		computed: {
		},
		created() {
		},
		methods: {
			edit(row){
				this.currRow = row
				this.editVisible =true
			},
			authorization(row){
				this.currRow = row
				this.authorizationVisible =true
			},
			del(id){
				this.$request.submit(systemRoleApi.delete({
					params: {
						id
					},
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return '删除成功'
					}
				}))
			},
			saveSuccess(){
				this.addVisible = false
				this.editVisible = false
				this.authorizationVisible = false
				this.$refs.table.reloadData()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>