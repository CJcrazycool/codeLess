<template>
	<div>
		<div class="select-box">
			<el-dropdown placement="bottom" @command="changeQuery" @visible-change="(value)=>{selectVisible=value}" trigger="click">
			      <span class="select-name">
			        {{currOption?currOption.label:''}}<i class="el-icon-arrow-down el-icon--right down-icon" :class="{expand:selectVisible}"></i>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item v-for="(item) in options" :key="item.name" :command="item.name">{{item.label}}</el-dropdown-item>
			      </el-dropdown-menu>
			</el-dropdown>
		</div>
		<el-input v-if="currOption" :placeholder="currOption?'请填写'+currOption.label:''" v-model="form[currOption.name]"></el-input>
	</div>
</template>

<script>
	
	export default {
		props:{
			options:{},
			form:{}
		},
		components:{
		},
		data() {
			return {
				currOption:null,
				selectVisible:false
			}
		},
		created() {
			if(this.options && this.options.length>=1){
				this.changeQuery(this.options[0].name)
			}
		},
		methods: {
			changeQuery(name){
				var option = this.options.find((item)=>{
					return item.name == name
				})
				if(this.currOption){
					this.form[option.name] = this.form[this.currOption.name]
					if(this.currOption.name != option.name)
						this.form[this.currOption.name] = ''
				}
				if(option)
					this.currOption = option
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select-box{
		display: inline-block;
		margin-right: 12px;
	}
	
	.select-name{
		cursor: pointer;
	}
	
	.el-input{
		width: auto;
	}
</style>
