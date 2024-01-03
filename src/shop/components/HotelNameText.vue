<!-- 酒店名文本 -->
<template>
	<span class="hotel-name-text" :title="text?text:loadText"><i v-if="loading" class="el-icon-loading"></i><template v-else>{{text?text:loadText}}</template></span>
</template>

<script>
	import hotelApi from '@shop/api/hotel'
	
	export default {
		props: {
			id: {},
			text:{}
		},
		data() {
			return {
				loadText:'',
				loading:false
			}
		},
		watch: {
		},
		computed: {
		},
		created(){
			this.load()
		},
		methods: {
			load(){
				if(this.id && !this.text)
					this.$request.load(hotelApi.queryById({
						params:{
							id:this.id
						},
						showErrorMessage:false,
						before:()=>{
							this.loading = true
						},
						success:(response)=>{
							if(response.data.result){
								this.loadText = response.data.result.anotherName? response.data.result.anotherName : response.data.result.name
								this.$emit('load-success',response.data.result)
							}
						},
						complete:(response)=>{
							this.loading = false
						}
					}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>