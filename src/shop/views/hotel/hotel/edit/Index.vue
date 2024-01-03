<template>
	<innerPageLayout>
		<el-form class="inner-page-form" @submit.native.prevent ref="form" :model="form" size="small" :rules="rules">
			<div class="inner-page-center">
				<tabHeader value="edit"></tabHeader>
				<div v-if="loading==1" class="loading" v-loading="true"></div>
				<div v-else-if="loading==2" class="form-body">
					<div class="form-area">
						<el-row :gutter="30">
							<el-col :span="12">
								<el-form-item label="封面图">
									<imageZoneSelector :limit="5" v-model="form.homePicture" tip="建议尺寸为750*500"></imageZoneSelector>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<div slot="label">封面图（长比例）<helpTip>如无上传长比例封面图，在相关图位上默认则将封面首图剪裁后进行展示</helpTip></div>
									<imageZoneSelector :multiple="false" v-model="form.image" tip="建议尺寸为750x904"></imageZoneSelector>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-form-item label="酒店标签">
								<tagList v-model="form.label" limit="8" label="标签"></tagList>
							</el-form-item>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="12">
								<el-form-item label="酒店名称" prop="name">
									<el-input :value="form.name" placeholder="请填写酒店名称" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item prop="alias">
									<div slot="label">酒店别名<helpTip>别名将会在客户端展现，如为空则优先展示酒店名称</helpTip></div>
									<el-input v-model="form.anotherName" placeholder="别名为空默认展示酒店名称"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="12">
								<el-form-item label="所在区域" prop="area">
									<el-input :value="form.city" placeholder="请填写所在区域" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="详细地址" prop="address">
									<el-input v-model="form.address" placeholder="请填写详细地址"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="12">
								<el-form-item label="联系电话" prop="tel">
									<el-input v-model="form.tel" placeholder="请填写联系电话"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="地图位置" prop="address">
									<mapInput v-model="form.coordinates"></mapInput>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="12">
								<el-form-item label="启用状态" prop="address">
									<el-switch v-model="form.state"></el-switch>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<div class="form-area-title">酒店政策</div>
					<div class="form-area">
						<el-row>
							<el-form-item>
								<editor v-model="form.booking" mode="simple" height="300px" placeholder="请填写酒店政策"></editor>
							</el-form-item>
						</el-row>
					</div>
					<div class="form-area-title">酒店详情</div>
					<div class="form-area preview-wrap">
						<div class="preview">
							<div v-if="!introductions || introductions.length<=0" class="tip empty">暂无图文</div>
							<img v-else v-for="(url,index) in introductions"  :key="index" v-img-src="{url:url,thumbnail:'normal'}">
						</div>
						<div class="right">
							<el-form-item label="图文上传">
								<imageZoneSelector v-model="form.introduction" :image-list.sync="introductions"></imageZoneSelector>
							</el-form-item>
						</div>
					</div>
					<div class="form-area-title">酒店设施</div>
					<div class="form-area preview-wrap">
						<div class="preview">
							<div v-if="!facilitys || facilitys.length<=0" class="tip empty">暂无图文</div>
							<img v-else v-for="(url,index) in facilitys"  :key="index" v-img-src="{url:url,thumbnail:'normal'}">
						</div>
						<div class="right">
							<el-form-item label="图文上传">
								<imageZoneSelector v-model="form.facility" :image-list.sync="facilitys"></imageZoneSelector>
							</el-form-item>
						</div>
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
	import {strings} from '@public/js/util'
	import tabHeader from './Tab'
	import innerPageLayout from '@shop/components/InnerPageLayout'
	import hotelApi from '@shop/api/hotel'

	export default {
		components:{
			innerPageLayout,
			tabHeader
		},
		data() {
			return {
				hotelApi,
				loading:0,
				saveLoading:false,
				rules: {},
				form: {
				},
				introductions:[],
				facilitys:[]
			}
		},
		watch: {
		},
		computed: {
		},
		created() {
			this.load(this.$route.query.id)
		},
		methods: {
			load(id){
				this.$request.load(hotelApi.queryById({
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
						message: '请完善酒店信息'
					})
					return
				}
				this.$request.submit(hotelApi.edit({
					data:{
						...this.form
					},
					before: () => {
						this.saveLoading = true
					},
					showSuccessMessage: 'alert',
					success: (response) => {

					},
					successText: (response) => {
						return '保存成功'
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

	.preview-wrap {
		display: flex;
		height: 600px;

		.preview {
			width: 300px;
			height: 100%;
			border: $--border-base;
			border-radius: $--border-radius-base;
			margin-right: 20px;
			overflow: auto;

			img {
				width: 100%;
				display: block;
			}

			.empty{
				padding: 30px;
				text-align: center;
				display: block;
			}
		}

		.right {
			flex: 1;
			height: 100%;
			overflow: auto;
		}
	}
</style>