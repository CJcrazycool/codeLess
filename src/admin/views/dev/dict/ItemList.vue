<template>
	<div class="drawer-content">
		<div class="drawer-body">
			<div>
				<tableView ref="table" row-key="id" size="small" :load-request="dictApi.dictItemList({params:{dictId:id}})" :enable-pager="false">
					<el-table-column label="数据键" min-width="100" prop="itemValue"></el-table-column>
					<el-table-column label="数据值" min-width="100" prop="itemText"></el-table-column>
					<el-table-column label="排序序号" min-width="100" prop="sortNo"></el-table-column>
					<el-table-column width="120" align="center">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
							<el-popconfirm @confirm="del(scope.row.id)" class="span_btn-text" title="确认删除？"
								placement="bottom-end">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
		<div class="drawer-footer">
			<el-button size="small" type="primary" @click="addVisible=true">添加数据项</el-button>
			<el-button size="small" @click="batchAddVisible=true">批量添加</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
		<el-dialog :append-to-body="true" title="添加数据项" :visible.sync="addVisible" width="640px" @open="addAlive=true" @closed="addAlive=false">
			<saveItemForm v-if="addAlive" :dict-id="id" @cancel="addVisible=false" @save="saveSuccess"></saveItemForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="批量添加数据项" :visible.sync="batchAddVisible" width="640px" @open="batchAddAlive=true" @closed="batchAddAlive=false">
			<batchAddForm v-if="batchAddAlive" :dict-code="code" @cancel="batchAddVisible=false" @save="saveSuccess"></batchAddForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="编辑数据项" :visible.sync="editVisible" width="640px" @open="editAlive=true" @closed="editAlive=false">
			<saveItemForm v-if="editAlive" :dict-id="id" :id="currRow ? currRow.id:null" @cancel="editVisible=false" @save="saveSuccess"></saveItemForm>
		</el-dialog>
	</div>
</template>

<script>
	import dictApi from '@admin/api/dict'
	import saveItemForm from './SaveItem'
	import batchAddForm from './BatchAddItem'

	export default {
		props: {
			id: {},
			code: {}
		},
		components: {
			saveItemForm,
			batchAddForm
		},
		data() {
			return {
				dictApi,
				addVisible:false,
				addAlive:false,
				batchAddVisible:false,
				batchAddAlive:false,
				editVisible:false,
				editAlive:false,
				currRow:null
			}
		},
		computed: {},
		watch: {},
		created() {
		},
		methods: {
			edit(row){
				this.currRow = row;
				this.editVisible =true
			},
			saveSuccess() {
				this.addVisible = false
				this.batchAddVisible = false
				this.editVisible = false
				this.$refs.table.reloadData()
			},
			del(id) {
				this.$request.submit(dictApi.deleteDictItem({
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
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
