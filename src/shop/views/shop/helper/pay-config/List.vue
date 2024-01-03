<template>
	<pagePanelNavLayout>
		<leftMenu slot="leftNav" value="pay"></leftMenu>
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm" default-expand-all
					row-class-name="expand-row-light" :select-rows.sync="selectRows" :load-request="payChannelApi.pageList()">
					<template slot="operate">
						<el-button size="small" type="primary" @click="addVisible=true">添加通道</el-button>
					</template>
					<el-table-column type="expand">
						<template slot-scope="scope">
							<div class="row-expand-content">
								<el-descriptions class="table-row-desc" title="通道信息">
									<el-descriptions-item label="商户号">{{scope.row.mchId}}</el-descriptions-item>
									<el-descriptions-item label="APPID">{{scope.row.appId}}</el-descriptions-item>
									<el-descriptions-item label="支付类型">{{scope.row.channelType_EnumText}}</el-descriptions-item>
									<el-descriptions-item label="生效规则">所有</el-descriptions-item>
									<el-descriptions-item label="通道说明">{{scope.row.remark}}</el-descriptions-item>
								</el-descriptions>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="支付通道" min-width="200" prop="payType_EnumText"></el-table-column>
					<el-table-column label="商户号" min-width="200" prop="mchId"></el-table-column>
					<el-table-column label="APPID" min-width="200" prop="appId"></el-table-column>
					<el-table-column label="通道状态" min-width="200">
						<template slot-scope="scope">
							<el-switch @change="e=>setState(e,scope.row)" v-model="scope.row.isValid"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="默认通道" min-width="200">
						<template slot-scope="scope">
							<el-switch @change="e=>setDefault(e,scope.row)" v-model="scope.row.isDefault"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" min-width="200" prop="createTime"></el-table-column>
					<el-table-column width="130" align="center">
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
		<el-drawer :append-to-body="true" title="添加通道" :visible.sync="addVisible" size="640px" @open="addAlive=true"
			@closed="addAlive=false">
			<saveForm v-if="addAlive" @cancel="addVisible=false" @save="saveSuccess"></saveForm>
		</el-drawer>
		<el-drawer :append-to-body="true" title="编辑通道" :visible.sync="editVisible" size="640px" @open="editAlive=true"
			@closed="editAlive=false">
			<saveForm v-if="editAlive" :id="currRow ? currRow.id:null" @cancel="editVisible=false" @save="saveSuccess">
			</saveForm>
		</el-drawer>
	</pagePanelNavLayout>
</template>

<script>
	import LeftMenu from '../LeftMenu'
	import payChannelApi from '@shop/api/payChannel'
	import saveForm from './Save'

	export default {
		components: {
			LeftMenu,
			saveForm
		},
		data() {
			return {
				payChannelApi,
				selectRows: [],
				addVisible: false,
				addAlive: false,
				editVisible: false,
				editAlive: false,
				searchForm: {},
				currRow: null
			}
		},
		computed: {},
		created() {},
		methods: {
			edit(row) {
				this.currRow = row;
				this.editVisible = true
			},
			saveSuccess() {
				this.addVisible = false
				this.editVisible = false
				this.$refs.table.reloadData()
			},
			del(id) {
				this.$request.submit(payChannelApi.delete({
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
			setDefault(e,row){
				this.$request.submit(payChannelApi.setDefault({
					params: {
						id:row.id
					},
					success: (response) => {
						if(response.data.success)
							this.$refs.table.reloadData()
					},
					successText:()=>{
						return '设置成功'
					}
				}))
			},
			setState(e,row){
				this.$request.submit(payChannelApi.setState({
					params: {
						id:row.id
					},
					success: (response) => {
						if(response.data.success)
							this.$refs.table.reloadData()
					},
					successText:()=>{
						return '设置成功'
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
