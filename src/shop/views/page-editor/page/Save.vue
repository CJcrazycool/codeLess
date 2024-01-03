<template>
	<div class="page-editor">
		<pageEditor :loading="loading==1 || styleLoading==1" :com-libs="comLibs" ref="pageEditor" :page-info.sync="pageInfo">
			<template v-if="pageInfo">
				<el-tag v-if="pageInfo.id" slot="headerCenter" class="span_left" size="small" :type="$dataDict.value('state_color',pageInfo.status)" effect="plain">{{pageInfo.status_dictText}}</el-tag>
				<template slot="headerRight">
					<el-button size="small">预览</el-button>
					<!-- <el-button v-if="!pageInfo.id || !pageInfo.status" :loading="saveLoading" size="small" @click="save(false)">存入草稿</el-button> -->
					<el-button :disabled="loading != 2 || styleLoading != 2" :loading="saveLoading" type="primary" icon="el-icon-circle-check" size="small"
						@click="save(true)">立即发布</el-button>
				</template>
			</template>
		</pageEditor>
		<el-dialog :append-to-body="true" :visible.sync="saveResult.visible" width="400px"
			:before-close="(done)=>{$router.replace('list')}">
			<el-result icon="success" title="保存成功" :subTitle="saveResult.status?'页面已完成发布':'页面已存至草稿箱'">
				<template slot="extra">
					<el-button size="text" @click="$router.replace('list')">返回列表</el-button>
					<el-button size="text" @click="successNext">继续编辑</el-button>
				</template>
			</el-result>
		</el-dialog>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import microPageApi from '@shop/api/microPage'
	import styleApi from '@shop/api/style'
	import pageEditor from '@public/components/page-editor/editor'
	import {mapState} from 'vuex';

	export default {
		components: {
			pageEditor
		},
		computed: {
			...mapState('public',['componentsEnvConfig'])
		},
		data() {
			return {
				comLibs: [{
						typeName: '基础组件',
						items: ['header', 'carousel', 'image', 'line','title','news']
					},
					{
						typeName: '酒店组件',
						items: ['hotelBook']
					}
				],
				pageInfo:null,
				loading: 2,
				styleLoading: 0,
				saveLoading: false,
				saveResult: {
					nextId:null,
					visible: false,
					status: null,
				}
			}
		},
		created() {
			this.loadStyle()
			if (this.$route.query.id) {
				this.load(this.$route.query.id)
			}else if (this.$route.query.copy_id) {
				this.load(this.$route.query.copy_id,true)
			} else {
				this.$nextTick(()=>{
					this.$refs.pageEditor.addCanvasCom('header')
				})
			}
		},
		methods: {
			//创建页面信息，用于传入页面编辑器中
			createPageInfo(result,isCopy){
				return {
					id: isCopy?null:result.id,
					name: isCopy?null:result.name,
					desc: result.description,
					remark: result.remark,
					bgColor: result.backgroundColor,
					status:result.status,
					status_dictText:result.status_dictText,
					typeId:result.typeId
				}
			},
			//生成表单数据
			createFormData(status) {
				var data = {}
				if (this.pageInfo.id)
					data.id = this.pageInfo.id
				data.typeId = this.pageInfo.typeId
				data.name = this.pageInfo.name
				data.backgroundColor = this.pageInfo.bgColor
				data.description = this.pageInfo.desc
				data.remark = this.pageInfo.remark
				data.status = status ? true : false
				data.component = this.$refs.pageEditor.createFormData()
				return data
			},
			//id加载
			load(id,isCopy) {
				this.$request.load(microPageApi.queryById({
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
						this.$nextTick(()=>{
							this.$refs.pageEditor.load(this.createPageInfo(response.data.result,isCopy),
								JSON.parse(response.data.result.component))
						})
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			loadStyle(){
				this.$request.load(styleApi.queryByShop({
					before: () => {
						this.styleLoading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.componentsEnvConfig.pageEditor.theme = {
							colorPrimary:response.data.result.colorPrimary,
							colorSecondary:response.data.result.colorSecondary,
							colorThrice:response.data.result.colorThrice
						}
						this.$store.commit('public/setComponentsEnv',this.componentsEnvConfig)
						this.styleLoading = 2
					},
					error: (response) => {
						this.styleLoading = 0
					}
				}))
			},
			//表单提交
			save(status) {
				var result = this.$refs.pageEditor.validateForm()
				if (!result.valid) {
					this.$message.error({
						message: '请完善组件或页面配置信息'
					})
					return
				}
				var method = !this.pageInfo.id?'add':'edit'
				var data = this.createFormData(status)
				var api = method=='add'?microPageApi.add:microPageApi.edit
				this.$request.submit(api({
					showSuccessMessage: false,
					data,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						if (response.data.success) {
							this.saveResult.visible = true
							this.saveResult.status = status
							if(response.data.result){
								this.$refs.pageEditor.load(this.createPageInfo(response.data.result))
								if(method=='add')
									this.saveResult.nextId = this.pageInfo.id
							}
						}
					},
					complete: () => {
						this.saveLoading = false
					}
				}))
			},
			successNext() {
				if (this.saveResult.nextId) {
					this.$router.replace({
						path: 'save',
						query: {
							id: this.saveResult.nextId
						}
					})
					this.saveResult.nextId = null
				}
				this.saveResult.visible = false
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
