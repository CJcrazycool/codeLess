<template>
	<div class="page-panel page-panel-body">
		<tabHeader value="category"></tabHeader>
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :enable-pager="false" default-expand-all
					:load-request="resourceCategoryApi.treeList()" :select-rows.sync="selectRows">
					<template slot="operate">
						<el-button size="small" type="primary" @click="addVisible=true">添加分类</el-button>
						<el-button size="small" @click="moveVisible=true">移动</el-button>
					</template>
					<el-table-column label="素材分类" min-width="200" prop="label"></el-table-column>
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
		<el-dialog :append-to-body="true" title="添加分类" :visible.sync="addVisible" width="640px"
		 @open="addAlive=true" @closed="addAlive=false">
			<saveForm v-if="addAlive" @save="addSuccess" @cancel="addVisible=false"></saveForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="编辑分类" :visible.sync="editVisible" width="640px"
		 @open="editAlive=true" @closed="editAlive=false">
			<saveForm v-if="editAlive" :id="currRow?currRow.id:null" @save="editSuccess" @cancel="editVisible=false"></saveForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="移动分类" :visible.sync="moveVisible" width="500px"
		 @open="moveTrace=false;moveAlive=true" @closed="checkMoveTrace();moveAlive=false;">
			<moveForm v-if="moveAlive" @cancel="moveVisible=false" @move-success="moveTrace=true"></moveForm>
		</el-dialog>
	</div>
</template>

<script>
	import resourceCategoryApi from '@shop/api/resourceCategory'
	import saveForm from './Save'
	import moveForm from './Move'
	import tabHeader from '../Tab'

	export default {
		components:{
			saveForm,
			moveForm,
			tabHeader
		},
		data() {
			return {
				resourceCategoryApi,
				tab: 'category',
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
				this.$request.submit(resourceCategoryApi.delete({
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