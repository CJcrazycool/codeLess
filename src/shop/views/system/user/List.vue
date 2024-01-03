<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="systemUserApi.pageList()">
					<template slot="search">
						<el-form-item label="关键词">
							<el-input v-model="searchForm.keyword" placeholder="帐号/姓名/手机号"></el-input>
						</el-form-item>
					</template>
					<template slot="operate">
						<el-button size="small" type="primary" @click="addVisible=true">添加用户</el-button>
					</template>
					<el-table-column label="登录账号" min-width="200">
						<template slot-scope="scope">
							{{scope.row.account}}<el-tag class="span_left" v-if="scope.row.isAdmin" size="small" effect="plain">主账号</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="帐号角色" prop="roleName" min-width="200"></el-table-column>
					<el-table-column label="员工姓名" prop="realname" min-width="180"></el-table-column>
					<el-table-column label="员工手机号" prop="mobile" min-width="180"></el-table-column>
					<el-table-column label="账号状态" prop="role" min-width="140">
						<template slot-scope="scope">
							<el-tag :type="$dataDict.value('system_user_state_color',scope.row.userState)" size="small" effect="plain">
								{{scope.row.userState_dictText}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime" min-width="180"></el-table-column>
					<el-table-column label="最近登录时间" prop="lastLoginTime" min-width="180"></el-table-column>
					<el-table-column width="180" align="center">
						<template slot-scope="scope">
							<template v-if="scope.row.isAdmin">
								<span class="text-secondary">不可编辑</span>
							</template>
							<template v-else>
								<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
								<el-button size="small" type="text" @click="editPassword(scope.row)">重置密码</el-button>
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
		<el-drawer :append-to-body="true" title="添加用户" :visible.sync="addVisible" size="640px" @open="addAlive=true"
			@closed="addAlive=false">
			<saveForm v-if="addAlive" @cancel="addVisible=false" @success="saveSuccess"></saveForm>
		</el-drawer>
		<el-drawer :append-to-body="true" title="编辑用户" :visible.sync="editVisible" size="640px" @open="editAlive=true"
			@closed="editAlive=false">
			<saveForm v-if="editAlive" @cancel="editVisible=false" :id="currRow.id" @success="saveSuccess"></saveForm>
		</el-drawer>
		<el-dialog :append-to-body="true" title="重置密码" :visible.sync="editPasswordVisible" width="640px"
			@open="editPasswordAlive=true" @closed="editPasswordAlive=false">
			<editPasswordForm v-if="editPasswordAlive" @cancel="editPasswordVisible=false" :id="currRow.id" @success="saveSuccess"></editPasswordForm>
		</el-dialog>
	</div>
</template>

<script>
	import systemUserApi from '@shop/api/systemUser'
	import saveForm from './Save'
	import editPasswordForm from './EditPassword'

	export default {
		components: {
			saveForm,
			editPasswordForm
		},
		data() {
			return {
				systemUserApi,
				addVisible: false,
				addAlive: false,
				editVisible: false,
				editAlive: false,
				editPasswordVisible: false,
				editPasswordAlive: false,
				searchForm: {
					keyword: ''
				},
				selectRows: [],
				currRow: null,
			}
		},
		computed: {
		},
		created() {},
		methods: {
			edit(row) {
				this.editVisible = true
				this.currRow = row
			},
			editPassword(row) {
				this.editPasswordVisible = true
				this.currRow = row
			},
			del(id) {
				this.$request.submit(systemUserApi.delete({
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
			saveSuccess() {
				this.addVisible = false
				this.editVisible = false
				this.editPasswordVisible = false
				this.$refs.table.reloadData()
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
