<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="memberApi.rechargeChannelPageList()">
					<template slot="search">
						<el-form-item label="渠道名称">
							<el-input v-model="searchForm.keyword" placeholder="请填写渠道名称"></el-input>
						</el-form-item>
					</template>

					<template slot="operate">
						<el-button size="small" type="primary" @click="addVisible=true">添加充值渠道</el-button>
					</template>

					<el-table-column label="充值渠道" min-width="200" prop="name"></el-table-column>
					<el-table-column label="所属分店" min-width="200" prop="hotelName"></el-table-column>
					<el-table-column label="默认充值渠道" min-width="200" prop="account">
						<template slot-scope="scope">
							<el-switch v-model="scope.row.isDefault" @change="e=>setDefaultRechargeChannel(e,scope.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="渠道状态" min-width="200">
						<template slot-scope="scope">
							<el-tag :type="$dataDict.value('state_color',scope.row.state)" size="small" effect="plain">{{scope.row.state_dictText}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime" min-width="200"></el-table-column>
					<el-table-column width="180" align="center">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
							<el-button size="small" type="text" @click="qrCode(scope.row)">二维码</el-button>
							<el-popconfirm @confirm="del(scope.row.id)" class="span_btn-text" title="确认删除？" placement="bottom-end">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
		<el-dialog :append-to-body="true" title="添加充值渠道" :visible.sync="addVisible" width="640px" @open="addAlive=true" @closed="addAlive=false">
			<saveForm v-if="addAlive" @cancel="addVisible=false" @save="saveSuccess"></saveForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="编辑充值渠道" :visible.sync="editVisible" width="640px" @open="editAlive=true" @closed="editAlive=false">
			<saveForm v-if="editAlive" :id="currRow ? currRow.id:null" @cancel="editVisible=false" @save="saveSuccess"></saveForm>
		</el-dialog>
		<el-dialog :append-to-body="true" title="渠道二维码" :visible.sync="qrCodeVisible" width="480px" @open="qrCodeAlive=true" @closed="qrCodeAlive=false">
			<qrCode v-if="qrCodeAlive" @cancel="qrCodeVisible=false" :channel="currRow"></qrCode>
		</el-dialog>
	</div>
</template>

<script>
	import memberApi from '@shop/api/member'
	import saveForm from './Save'
	import qrCode from './QrCode'

	export default {
		components: {
			saveForm,
			qrCode
		},
		data() {
			return {
				memberApi,
				selectRows: [],
				addVisible:false,
				addAlive:false,
				editVisible:false,
				editAlive:false,
				qrCodeVisible:false,
				qrCodeAlive:false,
				searchForm:{
					keyword:''
				},
				currRow:null
			}
		},
		computed: {
		},
		created() {},
		methods: {
			edit(row){
				this.currRow = row;
				this.editVisible =true
			},
			qrCode(row){
				this.currRow = row;
				this.qrCodeVisible =true
			},
			saveSuccess() {
				this.addVisible = false
				this.editVisible = false
				this.$refs.table.reloadData()
			},
			setDefaultRechargeChannel(e,row){
				this.$request.submit(memberApi.setDefaultRechargeChannel({
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
			del(id){
				this.$request.submit(memberApi.deleteRechargeChannel({
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
