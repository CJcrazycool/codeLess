<!-- 父节点级联选择器 -->
<template>
	<el-cascader v-bind="$attrs" v-on="$listeners" v-model="value"
		:options="checkCategoryOptions"
		:props="propsValue()"></el-cascader>
</template>

<script>
	import {recursionEach} from '@public/js/util'
	import lodashFp from 'lodash/fp'
	
	export default {
		props:{
			options:{},
			props:{},
			defaultValue:{},
			curr:{}
		},
		model: {
		    prop: 'defaultValue',
		    event: 'input'
		},
		watch: {
			'defaultValue':{
				immediate:true,
				handler(value) {
					this.value = value
				}
			},
			'value':{
				immediate:true,
				handler(value) {
					this.$emit('input',value)
				}
			}
		},
		computed: {
			//把自身节点设置为不可被选中！
			checkCategoryOptions(){
				var options = lodashFp.cloneDeep(this.options)
				if(!this.curr)
					return options
				var props = this.propsValue()
				recursionEach(options,(item)=>{
					if(item[props.value] == this.curr){
						item.disabled = true
						if(item.children)
							item.children = null
					}
				})
				return options
			}
		},
		data() {
			return {
				value:this.defaultValue
			}
		},
		created(){
			
		},
		methods:{
			propsValue(){
				return { 
					checkStrictly: true,
					value:'id',
					emitPath:false,
					...this.props
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
