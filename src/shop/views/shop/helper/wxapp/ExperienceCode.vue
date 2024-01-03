<template>
	<el-form class="dialog-form" @submit.native.prevent ref="form" size="small">
		<slot v-if="$slots['alert']" name="alert"></slot>
		<div class="form-body">
			<div class="form-area">
				<qrCode :loading="loading" :src="url">
					<slot slot="title" name="title"></slot>
					<slot slot="desc" name="desc"></slot>
				</qrCode>
			</div>
		</div>
		<div class="form-footer">
			<slot name="operate"></slot>
			<el-popover class="span_btn" v-model="addExperiencerVisible" @show="experiencerForm=resetExperiencerForm()" ref="addButton" placement="bottom-start" width="240" trigger="click">
				<el-form @submit.native.prevent size="small">
					<el-form-item label="体验者微信号">
						<el-input v-model="experiencerForm.wechatId" placeholder="请填写体验者微信号"></el-input>
						<div class="form-item-tip">如需删除体验者，请前往微信后台操作</div>
					</el-form-item>
					<el-button :loading="addExperiencerLoading" native-type="submit" :disabled="!experiencerForm.wechatId" size="small" type="primary" class="fill-width" @click="addExperiencer">确定</el-button>
				</el-form>
				<el-button slot="reference" type="success" size="small">添加体验权限</el-button>
			</el-popover>
			<el-button class="span_btn" size="small" @click="$emit('cancel')">取消</el-button>
		</div>
	</el-form>
</template>

<script>
	import wxAppApi from '@shop/api/wxApp'
	
	export default {
		components: {
		},
		data() {
			return {
				loading:false,
				url:null,
				addExperiencerLoading:false,
				addExperiencerVisible:false,
				experiencerForm:{
					wechatId:''
				}
			}
		},
		computed: {},
		created() {
			this.loadQrCode()
		},
		methods: {
			resetExperiencerForm(){
				return {
					wechatId:''
				}
			},
			addExperiencer(){
				this.$request.submit(wxAppApi.addExperiencer({
					params:this.experiencerForm,
					before: () => {
						this.addExperiencerLoading = true
					},
					success: (response) => {
						if(response.data.success)
							this.addExperiencerVisible = false
					},
					successText:()=>{
						return '添加成功'
					},
					complete: (response) => {
						this.addExperiencerLoading = false
					}
				}))
			},
			loadQrCode(){
				this.$request.load(wxAppApi.getExperienceAppUrl({
					before: () => {
						this.loading = true
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.url = response.data.result
					},
					complete: (response) => {
						this.loading = false
					}
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
