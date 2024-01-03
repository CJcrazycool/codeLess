<template>
	<innerPageLayout>
		<el-form class="page-panel-form" @submit.native.prevent ref="form" size="small" :rules="rules">
			<div class="inner-page-center">
				<tabHeader value="photo"></tabHeader>
				<div v-if="loading==1" class="loading" v-loading="true"></div>
				<div v-else-if="loading==2" class="photo-content">
					<el-empty v-if="!items || items.length<=0" description="暂无相册分类">
						<el-button size="small" icon="el-icon-plus" @click="categoryVisible=true">添加分类</el-button>
					</el-empty>
					<template v-else>
						 <el-alert class="alert-tip" show-icon :closable="false"
						    title="建议图片尺寸为800*800"
						    type="info">
						  </el-alert>
						<div class="category-button">
							<el-button type="text" icon="el-icon-menu" @click="categoryVisible=true">分类管理</el-button>
						</div>
						<div v-for="(item) in items" :key="item.id" class="photo-item">
							<div class="photo-category-name">
								<el-switch title="启用" active-color="#13ce66" v-model="item.reveal"></el-switch>
								<div class="text">{{item.name}}（{{!item.imgPath?0:item.imgPath.length}}/{{maxCount}}）</div>
							</div>
							<div class="photo-list">
								<imageZoneSelector value-formatter="object" :input-setter="imageSetter" :after-create-image="afterCreateImage"
									v-model="item.imgPath" :limit="maxCount">
									<template v-slot:default="scope">
										<el-input maxlength="8" v-model="scope.item.data.name" size="mini"
											placeholder="图片标题"></el-input>
									</template>
								</imageZoneSelector>
							</div>
						</div>
					</template>
				</div>
			</div>
			<div class="form-footer">
				<el-button native-type="submit" :disabled="loading!=2" :loading="saveLoading" size="small"
					type="primary" @click="saveAll">保存</el-button>
			</div>
		</el-form>
		<el-dialog :append-to-body="true" title="相册分类" :visible.sync="categoryVisible" width="600px"
			@open="categoryAlive=true" @closed="categoryAlive=false">
			<category :items="items" v-if="categoryAlive" @cancel="categoryVisible=false" @save="saveCategory">
			</category>
		</el-dialog>
	</innerPageLayout>
</template>

<script>
	import tabHeader from '../Tab'
	import innerPageLayout from '@shop/components/InnerPageLayout'
	import category from './Category'
	import hotelApi from '@shop/api/hotel'

	export default {
		components: {
			innerPageLayout,
			tabHeader,
			category
		},
		data() {
			return {
				maxCount:20,
				loading: 0,
				rules: {},
				items: [],
				categoryAlive: false,
				categoryVisible: false,
				saveLoading: false
			}
		},
		watch: {},
		computed: {},
		created() {
			this.load(this.$route.query.code)
		},
		methods: {
			imageSetter(item) {
				return {
					url: item.url,
					data: item.data
				}
			},
			afterCreateImage(item) {
				if (!item.data)
					item.data = {
						name: ''
					}
			},
			load(code) {
				this.$request.load(hotelApi.photoList({
					params: {
						hotelCode: code
					},
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (!response.data.result) {
							throw new Error()
						}
						this.items = response.data.result
						this.items.forEach((item) => {
							var imgPath = JSON.parse(item.imgPath)
							item.imgPath = []
							if (imgPath)
								imgPath.forEach((image) => {
									item.imgPath.push({
										url: image.url,
										data: {
											name: image.name
										}
									})
								})
						})
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			saveCategory(items) {
				items.forEach((item) => {
					if (item._isNew) {
						this.$set(item, 'imgPath', null)
						this.$set(item, 'reveal', true)
					}
				})
				this.items = items
				this.categoryVisible = false
			},
			saveAll() {
				var sort = 0;
				var data = this.items.map((item) => {
					sort += 1
					var imgPath = []
					if (item.imgPath)
						item.imgPath.forEach((item) => {
							imgPath.push({
								url: item.url,
								name: item.data.name
							})
						})
					return {
						id: item._isNew ? null : item.id,
						name: item.name,
						reveal: item.reveal,
						imgPath: JSON.stringify(imgPath),
						hotelCode: this.$route.query.code,
						sort: sort
					}
				})

				this.$request.submit(hotelApi.savePhoto({
					data,
					params: {
						hotelCode: this.$route.query.code
					},
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {

					},
					showSuccessMessage: 'alert',
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
	.alert-tip{
		margin-bottom: 30px;
	}
	
	.photo-content {
		margin-bottom: 60px;
		color: $--color-text-regular;
	}

	.category-button {
		float: right;
	}

	.photo-category-name {
		display: flex;
		font-size: $--font-size-medium;
		font-weight: $font-weight-large;

		.text {
			display: inline-block;
			margin-left: 10px;
			line-height: 20px;
		}

	}

	.photo-list {
		margin-top: 20px;

		::v-deep .image-list {

			.upload-btn,
			.image-box {
				width: 120px !important;
				height: 120px !important;
			}

			.image-item {
				width: 120px !important;
			}
		}
	}

	.photo-item {
		margin-bottom: 40px;
	}
</style>
