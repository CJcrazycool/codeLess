<template>
	<innerPageLayout>
		<div class="inner-page-center">
			<div v-if="loading == 1" class="loading" v-loading="true"></div>
			<template v-else>
				<div class="user-header">
					<thumbInfo class="user-info" :image-url="member.profilePhoto" :circle="true">
						<template slot="title">
							<span class="nickname">{{member.name}}</span>
							<el-tag :type="$dataDict.value('member_type_color',member.memberType)" size="small" effect="plain">{{member.memberType_dictText}}</el-tag>
							<el-tag v-if="member.isSubscribe" class="span_left" type="success" size="small" effect="plain">粉丝</el-tag>
						</template>
						<template slot="desc">
							{{member.mobile?member.mobile:'未获取'}}
						</template>
					</thumbInfo>
					<div class="user-card">
						<el-button type="text" icon="el-icon-bank-card" @click="cardDetailVisible=true">会员卡（{{memberCards.length}}张）</el-button>
					</div>
				</div>
				<el-descriptions title="客户信息" class="desc-view card" :colon="false">
					<el-descriptions-item label="注册门店">{{member.hotelName}}</el-descriptions-item>
					<el-descriptions-item label="注册渠道">{{member.registerType_dictText}}</el-descriptions-item>
					<el-descriptions-item label="客户创建时间">{{member.createTime}}</el-descriptions-item>
					<el-descriptions-item label="会员注册时间">{{member.registerTime}}</el-descriptions-item>
				</el-descriptions>
				<el-descriptions title="客户资料" class="desc-view card" :colon="false">
					<el-descriptions-item label="真实姓名">{{member.realname}}</el-descriptions-item>
					<el-descriptions-item label="性别">{{member.sex_dictText}}</el-descriptions-item>
					<el-descriptions-item label="电子邮箱">{{member.email}}</el-descriptions-item>
					<el-descriptions-item label="证件类型">{{member.certificateType}}</el-descriptions-item>
					<el-descriptions-item label="证件号码">{{member.certificateNo}}</el-descriptions-item>
				</el-descriptions>
				<el-descriptions title="OpenID" class="desc-view card" :colon="false" :column="2">
					<el-descriptions-item label="小程序OpenID">{{member.mpOpenId}}<copyText class="span_left" :text="member.mpOpenId"></copyText></el-descriptions-item>
					<el-descriptions-item label="公众号OpenID">{{member.openId}}<copyText class="span_left" :text="member.openId"></copyText></el-descriptions-item>
				</el-descriptions>
			</template>
		</div>
		<el-dialog :append-to-body="true" title="查询会员卡" :visible.sync="cardDetailVisible" width="800px">
			<cardDetail @cancel="cardDetailVisible=false" :member-cards="memberCards"></cardDetail>
		</el-dialog>
	</innerPageLayout>
</template>

<script>
	import innerPageLayout from '@shop/components/InnerPageLayout'
	import memberApi from '@shop/api/member'
	import cardDetail from './CardDetail'

	export default {
		components:{
			innerPageLayout,
			cardDetail
		},
		data() {
			return {
				member:{},
				memberCards:[],
				loading:0,
				cardDetailVisible:false
			}
		},
		watch: {
		},
		computed: {
		},
		created() {
			this.load(this.$route.query.id)
		},
		methods: {
			load(id){
				this.$request.load(memberApi.getDetailById({
					params: {
						id
					},
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.member = response.data.result.member
						this.memberCards = response.data.result.memberCards
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-header{
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}

	::v-deep .user-info{
		margin-bottom: 30px;

		.thumb-title,.thumb-desc{
			display: flex;
			align-items: center;
		}

		.empty,.thumb-box img{
			width: 50px;
			height: 50px;
		}


		.nickname{
			margin-right:8px;
			font-size: $--font-size-medium;
			font-weight: $font-weight-large;
		}

		.thumb-desc{
			margin-top: 4px;
		}
	}
</style>
