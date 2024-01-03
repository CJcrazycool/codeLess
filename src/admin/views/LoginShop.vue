<template>
</template>

<script>
	import tenantApi from '@admin/api/tenant'
	import { Loading } from 'element-ui';
	//商户端登录认证
	import {accessAuth} from '@shop/js/accessAuth'

	export default {
		props: {
		},
		components: {},
		data() {
			return {
				loading:null
			}
		},
		created() {
			if(this.$route.query.code)
				this.$request.submit(tenantApi.loginAdmin({
					params: {
						code:this.$route.query.code
					},
					before: () => {
						this.loading = Loading.service({
							fullscreen: true ,
							background:'transparent',
							text:'登录中...'
						})
					},
					showSuccessMessage:false,
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						accessAuth.setLoginSession(response.data.result)
						setTimeout(()=>{
							location.replace('./shop.html')
						},1200)
					}
				}))
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
</style>
