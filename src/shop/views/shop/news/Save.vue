<template>
	<innerPageLayout>
		<div class="inner-page-title">
			<div class="title-text">{{!form.id?'添加文章':'编辑文章'}}</div>
		</div>
		<el-form class="inner-page-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
			<div class="inner-page-center">
				<div v-if="loading==1" class="loading" v-loading="true"></div>
				<div v-else-if="loading==2" class="form-body">
					<div class="form-area">
						<el-row :gutter="30">
							<el-col :span="12">
								<el-form-item label="文章标题" prop="title">
									<el-input v-model="form.title" placeholder="请填写文章标题"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="文章分组" prop="groupId">
									<newsGroupSelect multiple class="fill-width" v-model="form.groupId" :clearable="true"></newsGroupSelect>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-form-item label="封面图" prop="image">
								<imageZoneSelector :limit="1" :multiple="false" v-model="form.image" tip="建议尺寸为750*500"></imageZoneSelector>
							</el-form-item>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="12">
								<el-form-item label="启用状态" prop="state">
									<el-switch v-model="form.state"></el-switch>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<div class="form-area-title">文章内容</div>
					<div class="form-area">
						<el-row>
							<el-form-item>
								<el-checkbox v-model="form.openOuterChain">开启外链展示</el-checkbox>
							</el-form-item>
						</el-row>
						<el-row v-if="form.openOuterChain" key="url">
							<el-form-item label="外链地址" prop="url">
								<el-input v-model="form.url" placeholder="请填写外链地址"></el-input>
							</el-form-item>
						</el-row>
						<el-row v-else>
							<el-form-item>
								<editor v-model="form.content" height="500px" placeholder="请填写文章内容"></editor>
							</el-form-item>
						</el-row>
					</div>
				</div>
			</div>	
			<div class="form-footer">
				<el-button :disabled="loading!=2" :loading="saveLoading" native-type="submit" size="small" type="primary"
					@click="save">保存</el-button>
			</div>
		</el-form>
	</innerPageLayout>
</template>

<script>
	import {validateForm} from '@public/js/util'
	import innerPageLayout from '@shop/components/InnerPageLayout'
	import newsApi from '@shop/api/news'
	import newsGroupSelect from '@shop/components/NewsGroupSelect'

	export default {
		components:{
			newsGroupSelect,
			innerPageLayout
		},
		data() {
			return {
				newsApi,
				loading:2,
				saveLoading:false,
				form: {
					id:null,
					title:'',
					groupId:[],
					image:'',	
					state:false,
					openOuterChain:false,
					url:'',
					content:''
				},
				rules:{
					'title': [{
						required: true,
						message: '请填写文章标题'
					}],
					'image':[{
						required: true,
						message: '请上传文章封面'
					}],
					'url':[{
						required: true,
						message: '请填写外链地址'
					}]
				},
				facilitys:[]
			}
		},
		watch: {
		},
		computed: {
		},
		created() {
			if(this.$route.query.id)
				this.load(this.$route.query.id)
		},
		methods: {
			load(id){
				this.form.id = id
				this.$request.load(newsApi.queryById({
					params: {
						id
					},
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.form = response.data.result;
						this.form.groupId = this.form.groupId?this.form.groupId.split(','):[]
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			save(){
				var vaild = validateForm(this.$refs.form)
				if (!vaild) {
					this.$message.error({
						message: '请完善文章信息'
					})
					return
				}
				const api = !this.form.id ? newsApi.add : newsApi.edit
				const groupId = this.form.groupId.join(',')
				this.$request.submit(api({
					data:{
						...this.form,
						groupId
					},
					before: () => {
						this.saveLoading = true
					},
					showSuccessMessage:false,
					success: (response) => {
						if (response.data.success) {
							this.$alert('保存成功', '提示', {
								type: 'success',
								confirmButtonText: '确定',
								onClose:()=>{
									if(!this.id)
										this.$reloadView()
								}
							})
						}
					},
					complete: () => {
						this.saveLoading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>