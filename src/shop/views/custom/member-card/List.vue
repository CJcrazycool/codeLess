<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="memberApi.mbrCardTypePageList()">
					<template slot="operate">
						<div class="tip">如需获取最新数据，请前往<el-button type="text" @click="$router.push('/system/data-syn/update')">系统直连</el-button>中进行更新</div>
					</template>
					<el-table-column label="会员卡" min-width="200" prop="account">
						<template slot-scope="scope">
							<thumbInfo :image-url="scope.row.image">
								<template slot="title">
									{{scope.row.name}}
								</template>
								<template slot="desc">
									{{scope.row.code}}
								</template>
							</thumbInfo>
						</template>
					</el-table-column>
					<el-table-column label="是否为初始等级" min-width="200" prop="account">
						<template slot-scope="scope">
							<el-switch v-model="scope.row.isDefault" @change="e=>setDefaultMbrCardType(e,scope.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime" min-width="200"></el-table-column>
					<el-table-column width="160" align="center">
						<template slot-scope="scope">
							<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
							<el-button size="small" type="text" @click="rechargeInfo(scope.row)">储值政策</el-button>
						</template>
					</el-table-column>
				</tableView>
			</div>
		</div>
		<el-drawer :append-to-body="true" title="编辑会员卡" :visible.sync="editVisible"
		 @open="editAlive=true" @closed="editAlive=false">
			<saveForm v-if="editAlive" :id="currRow ? currRow.id:null" @save="editSuccess" @cancel="editVisible=false"></saveForm>
		</el-drawer>
		<el-dialog :append-to-body="true" title="储值政策" :visible.sync="rechargeInfoVisible" width="580px"
		 @open="rechargeInfoAlive=true" @closed="rechargeInfoAlive=false">
			<rechargeInfo v-if="rechargeInfoAlive" :id="currRow ? currRow.id:null" @cancel="rechargeInfoVisible=false"></rechargeInfo>
		</el-dialog>
	</div>
</template>

<script>
	import memberApi from '@shop/api/member'
	import saveForm from './Save'
	import rechargeInfo from './RechargeInfo'

	export default {
		components: {
			saveForm,
			rechargeInfo
		},
		data() {
			return {
				memberApi,
				selectRows: [],
				editVisible:false,
				editAlive:false,
				rechargeInfoVisible:false,
				rechargeInfoAlive:false,
				searchForm:{},
				currRow:null
			}
		},
		computed: {
			
		},
		created() {},
		methods: {
			edit(row){
				this.currRow = row
				this.editVisible =true
			},
			editSuccess() {
				this.editVisible = false
				this.$refs.table.reloadData()
			},
			rechargeInfo(row){
				this.currRow = row
				this.rechargeInfoVisible =true
			},
			setDefaultMbrCardType(e,row){


				this.$request.submit(memberApi.setDefaultMbrCardType({
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
