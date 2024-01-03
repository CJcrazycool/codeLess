<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :enable-pager="false"
					:load-request="tenantAuthApi.treeList()" :select-rows.sync="selectRows">
					<template slot="operate">
						<el-button size="small" type="primary" @click="addVisible=true">添加权限</el-button>
						<!-- <el-button size="small" @click="moveVisible=true">移动</el-button> -->
					</template>
					<el-table-column label="权限名称" min-width="200" prop="name"></el-table-column>
					<el-table-column label="授权标识" min-width="200" prop="perms"></el-table-column>
					<el-table-column label="权限类型" min-width="200" prop="menuType_dictText"></el-table-column>
					<el-table-column label="可见范围" min-width="200" prop="perms">
						<template slot-scope="scope">
							<el-tag :type="$dataDict.value('state_color',scope.row.showType)" size="small" effect="plain">
								{{scope.row.showType_dictText}}
							</el-tag >
						</template>
					</el-table-column>
					<el-table-column label="排序序号" min-width="200" prop="sortNo"></el-table-column>
					<el-table-column width="130" align="center">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
							<el-popconfirm @confirm="del(scope.row)" class="span_btn-text" title="确认删除？"
								placement="bottom-end">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
		<el-dialog :append-to-body="true" title="添加权限" :visible.sync="addVisible" width="640px"
		 @open="addAlive=true" @closed="addAlive=false">
			<saveForm v-if="addAlive" @save="addSuccess" @cancel="addVisible=false"></saveForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="编辑权限" :visible.sync="editVisible" width="640px"
		 @open="editAlive=true" @closed="editAlive=false">
			<saveForm v-if="editAlive" :id="currRow?currRow.id:null" @save="editSuccess" @cancel="editVisible=false"></saveForm>
		</el-dialog>
		<!-- <el-dialog :append-to-body="true" title="移动分类" :visible.sync="moveVisible" width="500px"
		 @open="moveTrace=false;moveAlive=true" @closed="checkMoveTrace();moveAlive=false;">
			<moveForm v-if="moveAlive" @cancel="moveVisible=false" @move-success="moveTrace=true"></moveForm>
		</el-dialog> -->
	</div>
</template>

<script>
	import tenantAuthApi from '@admin/api/tenantAuth'
	import saveForm from './Save'
	// import moveForm from './Move'

	export default {
		components:{
			saveForm,
			// moveForm
		},
		data() {
			return {
				tenantAuthApi,
				selectRows: [],
				addVisible:false,
				addAlive:false,
				editVisible:false,
				editAlive:false,
				currRow:null,
				moveVisible:false,
				moveAlive:false,
				moveTrace:false
			}
		},
		computed: {
		},
		watch: {
		},
		created() {
		},
		methods: {
			addSuccess() {
				this.addVisible = false
				this.$refs.table.reloadData()
			},
			editSuccess() {
				this.editVisible = false
				this.$refs.table.reloadData()
			},
			checkMoveTrace(){
				if(this.moveTrace)
					this.$refs.table.reloadData()
			},
			edit(row){
				this.currRow = row
				this.editVisible = true
			},
			del(row) {
				this.$request.submit(tenantAuthApi.delete({
					params:{
						id:row.id
					},
					success: (response) => {
						if (response.data.success)
							this.$refs.table.reloadData()
					},
					successText: (response) => {
						return '删除成功'
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>