<template>
	<div class="page-panel page-panel-body">
		<div class="dataview-layout">
			<div class="dataview-content">
				<tableView ref="table" row-key="id" size="small" :search-form="searchForm"
					:select-rows.sync="selectRows" :load-request="api.pageList()">
					<template slot="search">
						<el-form-item>
							<dropdownInput :options="queryInfoOptions" :form="searchForm"></dropdownInput>
						</el-form-item>
						<el-form-item label="会员卡号">
							<el-input v-model="searchForm.mbrCardNo" placeholder="请填写会员卡号"></el-input>
						</el-form-item>
						<el-form-item label="会员卡类型">
							<el-select v-model="searchForm.mbrCardTypeCode" placeholder="请选择会员卡类型" :clearable="true">
								<el-option v-for="item in mbrCardTypeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<dropdownInput :options="queryOpenIDOptions" :form="searchForm"></dropdownInput>
						</el-form-item><br/>
						<el-form-item label="客户创建时间">
							<dateRange :begin-value.sync="searchForm.startDate" :end-value.sync="searchForm.endDate"></dateRange>
						</el-form-item>
						<el-form-item label="会员注册时间">
							<dateRange :begin-value.sync="searchForm.startRegisterTime" :end-value.sync="searchForm.endRegisterTime"></dateRange>
						</el-form-item>
					</template>
					<el-table-column label="客户" min-width="200" prop="account">
						<template slot-scope="scope">
							<thumbInfo :image-url="scope.row.profilePhoto" :circle="true">
								<template slot="title">
									{{scope.row.name}}<el-tag :type="$dataDict.value('member_type_color',scope.row.memberType)" class="span_left" size="mini" effect="plain">{{scope.row.memberType_dictText}}</el-tag>
									<el-tag v-if="scope.row.isSubscribe" class="span_left" type="success" size="mini" effect="plain">粉丝</el-tag>
								</template>
								<template slot="desc">
									{{scope.row.mobile?scope.row.mobile:'未获取'}}
								</template>
							</thumbInfo>
						</template>
					</el-table-column>
					<el-table-column label="主会员卡" min-width="200" prop="account">
						<template slot-scope="scope">
							<template v-if="scope.row.profileId">{{scope.row.mbrCardTypeName}}<br/><span class="text-secondary">{{scope.row.mbrCardNo}}</span></template>
						</template>
					</el-table-column>
					<el-table-column label="客户创建时间" prop="createTime" min-width="200">
						<template slot-scope="scope">{{scope.row.createTime}}</template>
					</el-table-column>
					<el-table-column label="会员注册时间" prop="last_login" min-width="200">
						<template slot-scope="scope">{{scope.row.registerTime}}</template>
					</el-table-column>
					<el-table-column width="130" align="center">
						<template slot-scope="scope">
							<el-button slot="reference" type="text" size="small" @click="detail(scope.row)">查看</el-button>
							<el-popconfirm @confirm="del(scope.row.id)" class="span_btn-text" title="确认删除？" placement="bottom-end">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
					
				</tableView>
			</div>
		</div>
	</div>
</template>

<script>
	import memberApi from '@shop/api/member'
	import {formatter} from '@public/js/util'
	import {dateHelper} from '@public/js/util'

	export default {
		components: {},
		data() {
			return {
				api:memberApi,
				queryInfoOptions: [
					{
						name: 'mobile',
						label: '客户手机号'
					},
					{
						name: 'name',
						label: '客户名称'
					}
				],
				queryOpenIDOptions: [{
						name: 'mpOpenId',
						label: '小程序OpenID'
					},
					{
						name: 'openId',
						label: '公众号OpenID'
					}
				],
				searchForm: {
					mobile:'',
					name:'',
					mpOpenId:'',
					openId:'',
					mbrCardNo:'',
					mbrCardTypeCode:'',
					startDate:'',
					endDate:'',
					startRegisterTime:'',
					endRegisterTime:''
				},
				selectRows: [],
				mbrCardTypeList:[]
			}
		},
		computed: {
		},
		created() {
			this.load()
			var defaultDateRange = dateHelper.getRecentDayRange(90)
			this.searchForm.startDate = formatter.getDateText(defaultDateRange.start)
			this.searchForm.endDate = formatter.getDateText(defaultDateRange.end)
		},
		methods: {
			load(){
				this.$request.load(memberApi.mbrCardTypeList({
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.mbrCardTypeList = response.data.result
					}
				}))
			},
			detail(row){
				this.$router.openWindow({
					path:'./detail',
					query:{
						id:row.id
					}
				})
			},
			del(id){
				this.$request.submit(memberApi.delete({
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
