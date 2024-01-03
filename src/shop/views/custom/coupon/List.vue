<template>
	<div class="page-panel page-panel-body">
		<div class="area-block">
			<div class="area-block-title">优惠券效果</div>
			<div class="sum-result-data">
				<div class="result-item">
					<div class="title">累计领券数</div>
					<div class="value">0</div>
				</div>
				<div class="result-item">
					<div class="title">累计转化数</div>
					<div class="value">0</div>
				</div>
				<div class="result-item">
					<div class="title">累计领取用户数</div>
					<div class="value">0</div>
				</div>
				<div class="result-item">
					<div class="title">累计转化用户数</div>
					<div class="value">0</div>
				</div>
				<div class="result-item">
					<div class="title">累计拉动成交总额(元)</div>
					<div class="value text-success">0</div>
				</div>
			</div>
		</div>
		<div class="area-block">
			<div class="area-block-title">优惠券管理</div>
			<div class="dataview-layout">
				<div class="dataview-content">
					<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
						:select-rows.sync="selectRows" :load-request="couponApi.pageList()">
						<template slot="search">
							<el-form-item label="优惠券名称">
								<el-input v-model="searchForm.keyword" placeholder="请填写优惠券名称"></el-input>
							</el-form-item>
							<el-form-item label="券类型">
								<dictSelect dict-key="coupon_type" v-model="searchForm.ticketType" placeholder="请选择优惠券类型" :clearable="true"></dictSelect>
							</el-form-item>
						</template>
						<template slot="operate">
							<div class="tip">如需获取最新数据，请前往<el-button type="text" @click="$router.push('/system/data-syn/update')">系统直连</el-button>中进行更新</div>
						</template>
						<el-table-column label="优惠券" min-width="200" prop="account">
							<template slot-scope="scope">
								<thumbInfo :image-url="scope.row.image">
									<template slot="title">
										{{scope.row.ticketName}}
									</template>
									<template slot="desc">
										{{scope.row.ticketCode}}
									</template>
								</thumbInfo>
							</template>
						</el-table-column>
						<el-table-column label="累计领取/使用" min-width="200" prop="account">
							<template slot-scope="scope">
								已领取 1000<br/>
								已使用 0
							</template>
						</el-table-column>
						<el-table-column label="券类型" min-width="200" prop="ticketType_dictText"></el-table-column>
						<el-table-column label="使用说明" min-width="300" prop="remark" show-overflow-tooltip></el-table-column>
						<el-table-column label="创建时间" prop="createTime" min-width="200"></el-table-column>
						<el-table-column width="100" align="center">
							<template slot-scope="scope">
								<el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
							</template>
						</el-table-column>
					</tableView>
				</div>
			</div>
		</div>
		<el-drawer :append-to-body="true" title="编辑优惠券" :visible.sync="editVisible"
		 @open="editAlive=true" @closed="editAlive=false">
			<saveForm v-if="editAlive" :id="currRow ? currRow.id:null" @save="editSuccess" @cancel="editVisible=false"></saveForm>
		</el-drawer>
	</div>
</template>

<script>
	import couponApi from '@shop/api/coupon'
	import saveForm from './Save'

	export default {
		components: {
			saveForm
		},
		data() {
			return {
				couponApi,
				selectRows: [],
				editVisible:false,
				editAlive:false,
				searchForm:{
					keyword:'',
					ticketType:''
				},
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.dataview-layout{
	}
	
</style>
