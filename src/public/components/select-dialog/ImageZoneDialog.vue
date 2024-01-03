<!-- 图库空间选择 -->
<template>
	<el-dialog :append-to-body="true" :title="title" :visible.sync="dialogVisible" :width="width"
	 v-bind="$attrs" v-on="$listeners" @open="contentAlive=true" @closed="contentAlive=false">
		<imageZoneContent v-if="contentAlive" :multiple="multiple" :limit="limit"
		:select-rows.sync="selectRows" @dbclick="dbClick" @select-done="selectDone"
		 @upload-success="uploadSuccess"
		 @cancel="dialogVisible=false">
		 </imageZoneContent>
	</el-dialog>
</template>

<script>
	import baseSelectDialog from '../base/BaseSelectDialog'
	import imageZoneContent from './content/ImageZoneContent'
	
	export default {
		mixins :[
			baseSelectDialog
		],
		components:{
			imageZoneContent
		},
		props:{
			width:{
				default:()=>{
					return '900px'
				}
			}
		},
		data(){
			return {
				title:'选择图片'
			}
		},
		methods: {
			selectDone(rows) {
				if(this.limit && rows.length>this.limit){
					this.$message({
						message: '最多只能选择' + this.limit + '张图片',
						type: 'error'
					})
					return
				}
				var rows = rows.map((row)=>{
					return row['imgUrl']
				})
				rows = !this.multiple?rows[0]:rows
				this.finish(rows)
			},
			uploadSuccess(files){
				this.finish(files)
			},
			dbClick(row){
				this.selectDone([row])
			},
			finish(rows) {
				if (this.onFinish)
					this.onFinish(rows)
				this.dialogVisible = false
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>