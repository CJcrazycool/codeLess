<!-- 链接文本 -->
<template>
	<span><i v-if="loading" class="el-icon-loading"></i><template v-else>{{getText(link)}}</template></span>
</template>

<script>
	import microPageApi from '@shop/api/microPage'
	import hotelApi from '@shop/api/hotel'
	
	export default {
		props: {
			link:{},
			text:{}
		},
		data() {
			return {
				loadText:'',
				loading:false,
				requestLoads:{
					'page':{
						prefixText:(label) => {
							return '微页面 - ' + (label?label:'')
						},
						api:microPageApi.queryById,
						success:(response)=>{
							if(response.data.result)
								this.loadText = response.data.result.name
						}
					},
					'hotelDetail':{
						prefixText:(label) => {
							return '酒店详情 - ' + (label?label:'')
						},
						api:hotelApi.queryById,
						success:(response)=>{
							if(response.data.result)
								this.loadText = response.data.result.anotherName? response.data.result.anotherName : response.data.result.name
						}
					}
				}
			};
		},
		created(){
			this.updateLoad()
		},
		methods: {
			updateLoad(){
				if(this.link && !this.text){
					if(this.requestLoads[this.link.route]){
						this.$request.load(this.requestLoads[this.link.route].api({
							params:{
								id:this.link.params.id
							},
							showErrorMessage:false,
							before:()=>{
								this.loading = true
							},
							success:this.requestLoads[this.link.route].success,
							complete:(response)=>{
								this.loading = false
							}
						}))
					}
					this.$emit('update-load-done')
				}
			},
			getText(link){
				if (this.requestLoads[link.route]) {
					return this.requestLoads[link.route].prefixText(this.text?this.text:this.loadText)
				}
				return link.label
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
