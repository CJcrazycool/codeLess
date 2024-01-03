<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
		<div class="form-body">
			<div class="form-area">
				<el-form-item label="字段名称" prop="name">
					<el-input v-model="form.name" placeholder="请填写字段名称" maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="Icon" prop="fileList">
					<imageZoneSelector v-model="form.icon" :limit="1" :multiple="false"></imageZoneSelector>
				</el-form-item>
			</div>
		</div>
		<div class="form-footer">
			<el-button native-type="submit" size="small" type="primary" @click="save">确定</el-button>
			<el-button size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import lodashFp from 'lodash/fp'
	
	export default {
		components:{
		},
		props:{
			formType:{},
			defaultForm:{}
		},
		data() {
			return {
				form:{
					name:'',
					icon:null,
					type:this.formType,
					_isNew:true
				},
				rules:{
					'name': [{
						required: true,
						message: '请填写字段名称'
					}]
				}
			}
		},
		computed: {
		},
		created() {
			if(this.defaultForm)
				this.form = lodashFp.cloneDeep(this.defaultForm)
		},
		methods: {
			save(){
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善字段信息'
					})
					return
				}
				this.$emit('save',this.form)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>