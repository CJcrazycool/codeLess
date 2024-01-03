<template>
	<el-dialog :append-to-body="true" :title="title" :visible.sync="dialogVisible" :width="width" top="10vh"
	 v-bind="$attrs" v-on="$listeners" @open="contentAlive=true" @closed="contentAlive=false">
		<component v-if="contentAlive && componentContent" :is="componentContent" :select-rows.sync="selectRows" @dbclick="dbClick"
		:multiple="multiple" :limit="limit" v-bind="$attrs['content-options']" v-on="$listeners['content-options']">
		</component>
		<div class="dialog-footer">
			<el-button :disabled="selectRows.length<=0" size="small" type="primary" @click="finish(selectRows)">确定</el-button>
			<el-button size="small" @click="dialogVisible = false">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props:{
			width:{
				default:()=>{
					return '1100px'
				}
			},
			multiple:{
				default:()=>{
					return true
				}
			},
			limit:{}
		},
		data() {
			return {
				title:null,
				componentContent:null,
				selectRows: [],
				onFinish:null,
				dialogVisible: false,
				contentAlive:false
			};
		},
		mounted() {},
		methods: {
			getLimit(){
				return this.multiple?this.limit:1
			},
			open(onFinish) {
				this.dialogVisible = true
				this.onFinish = onFinish
			},
			invalidLimit(){
				this.$message({
					message: '最多只能选择' + this.getLimit() + '条记录',
					type: 'error'
				})
			},
			dbClick(row) {
				this.finish([row])
			},
			finish(rows) {
				var limit = this.getLimit()
				if(limit && rows.length>limit){
					this.invalidLimit()
					return
				}
				rows = !this.multiple?rows[0]:rows
				if (this.onFinish)
					this.onFinish(rows)
				this.dialogVisible = false
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>