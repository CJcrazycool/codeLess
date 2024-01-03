<!-- 日期范围选择 -->
<template>
	<el-date-picker ref="picker"
	:default-time="['00:00:00', '23:59:59']"
	      v-model="value"
	      type="datetimerange"
	      :picker-options="pickerOptions"
	      start-placeholder="开始日期"
	      end-placeholder="结束日期"
		  value-format="yyyy-MM-dd HH:mm:ss"
		  align="center">
	    </el-date-picker>
</template>

<script>
	import {dateHelper} from '@public/js/util'
	
	export default {
		props: {
			beginValue:{},
			endValue:{}
		},
		watch:{
			beginValue:{
				handler(value){
					this.value = [this.beginValue, this.endValue]
				}
			},
			endValue:{
				handler(value){
					this.value = [this.beginValue, this.endValue]
				}
			},
			value:{
				handler(value){
					if(value){
						this.$emit('update:begin-value',this.value[0])
						this.$emit('update:end-value',this.value[1])
					}else{
						this.$emit('update:begin-value','')
						this.$emit('update:end-value','')
					}
				}
			}
		},
		created(){
			if(this.beginValue && this.endValue){
				this.value[0] = this.beginValue
				this.value[1] = this.endValue
			}
		},
		data() {
			return {
				value:[],
				pickerOptions: {
					shortcuts: [{
						text: '最近7天',
						onClick(picker) {
							var range = dateHelper.getRecentDayRange(7)
							picker.$emit('pick', [range.start, range.end]);
						}
					}, {
						text: '最近15天',
						onClick(picker) {
							var range = dateHelper.getRecentDayRange(15)
							picker.$emit('pick', [range.start, range.end]);
						}
					}, {
						text: '最近30天',
						onClick(picker) {
							var range = dateHelper.getRecentDayRange(30)
							picker.$emit('pick', [range.start, range.end]);
						}
					}, {
						text: '最近90天',
						onClick(picker) {
							var range = dateHelper.getRecentDayRange(90)
							picker.$emit('pick', [range.start, range.end]);
						}
					}]
				}
			};
		},
		mounted() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
</style>
