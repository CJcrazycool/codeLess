<template>
	<div>
		<span class="title">解除授权方式</span>：<br/><br/>方式1：如果是小程序，可以登录微信公众平台-设置-第三方设置-解除授权，然后按照指引进行操作即可。
		如果是公众号，可以登录微信公众平台-设置与开发-公众号设置-授权管理-查看平台详情-取消授权，然后按照指引进行操作即可。
		<br/><br/>方式2：在微信客户端访问“公众平台安全助手”-“绑定查询”-“微信号绑定账号”，看到授权的账号，点击进入授权第三方列表，然后再点击“解除授权”的icon即可可解除授权
		<div class="img"><a :href="img" target="_blank"><img :src="img"/></a></div>
		<div class="dialog-footer">
			<el-button size="small" type="primary" @click="$emit('cancel')">我已了解</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
		},
		components: {},
		data() {
			return {
				img:'https://res.wx.qq.com/op_res/bhyMiUmtCDYv1-OTFzkT4XY6kspHYSAbaFu2GMiEpLuoceA7FlC1jBnU4V7JOr7kXqWnFEdlc3Hc4c4_q_fYvw'
			}
		},
		computed: {
		},
		watch: {},
		created() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-weight: $font-weight-large;
	}
	
	.img{
		text-align: center;
		margin-top: 30px;
		
		img{
			width: 400px;
		}
	}
</style>
