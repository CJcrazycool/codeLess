<template>
	<div class="page-panel" v-loading="loading==1">
		<el-form class="page-panel-form" :rules="rules" :model="form" ref="form" size="small">
			<div class="set-tabbar-main">
				<div class="left">
					<div class="preview">
						<div class="canvas">
							<div class="tabbar">
								<div v-if="form.hidden" class="hidden">
									导航栏已隐藏
								</div>
								<template v-else>
									<div v-if="tabList.length<tabMinAdd" class="empty">
										<el-button size="small" @click="addTabVisible=true">+
											请在添加{{tabMinAdd-tabList.length}}项菜单</el-button>
									</div>
									<div v-else v-for="(item,index) in tabList" class="item-wrap">
										<div class="item" @click="activeTabId = item.id"
											:class="{active:activeTabId==item.id}"
											:style="{color:activeTabId==item.id?form.activeColor:form.unActiveColor}">
											<div class="icon">
												<img
													v-img-src="{url:activeTabId==item.id?item.activeIcon:item.unActiveIcon,thumbnail:'mini'}">
											</div>
											<div class="text">{{item.name}}</div>
										</div>
									</div>
								</template>
							</div>
						</div>
					</div>
				</div>
				<div class="right">
					<div class="com-control-area">
						<div class="com-control-area-title">
							底部导航
							<div class="com-control-area-desc">可用于展示商城的页面栏目，告知客户所在页面和位置</div>
						</div>
						<div>
							<el-form-item label="导航栏设置" prop="hidden">
								<el-checkbox v-model="form.hidden">隐藏导航栏</el-checkbox>
							</el-form-item>
							<el-form-item v-if="form.hidden" label="默认首页链接" prop="defaultUrl">
								<setLinkButton v-model="form.defaultUrl"
									:button-attrs="{type:'text',icon:'el-icon-link',size:'medium'}"
									:popover-options="{placement:'bottom-start'}">链接页面</setLinkButton>
							</el-form-item>
						</div>
						<template v-if="!form.hidden">
							<div ref="tabList" class="tab-list">
								<draggable handle=".move" v-model="tabList" forceFallback="true" animation="400">
									<div v-for="(item,index) in tabList" :key="item.id" class="item">
										<div class="set-unactive">
											<div class="icon-image">
												<img v-img-src="{url:item.unActiveIcon,thumbnail:'mini'}" />
											</div>
											<div>未选中</div>
										</div>
										<div class="set-active">
											<div class="icon-image">
												<img v-img-src="{url:item.activeIcon,thumbnail:'mini'}" />
											</div>
											<div>选中</div>
										</div>
										<div class="set-config">
											<div class="header">
												<div class="label">{{item.name}}</div>
												<div class="operate">
													<el-button title="拖动" class="move btn-text-info" icon="el-icon-rank"
														type="text"></el-button>
													<el-button title="删除" class="btn-text-info" icon="el-icon-delete"
														type="text" @click="removeTab(item.id)"></el-button>
												</div>
											</div>
											<div class="text">
												<setLinkText :link="item.link"></setLinkText>
											</div>
											<div class="bottom">
												<el-button icon="el-icon-edit-outline" type="text"
													@click="editTabForm=item;editTabVisible=true">编辑菜单</el-button>
											</div>
										</div>
									</div>
								</draggable>
							</div>
							<el-button v-if="tabList.length<tabMaxAdd" class="fill-width" icon="el-icon-plus"
								@click="addTabVisible=true">
								添加菜单（{{tabList.length}}/{{tabMaxAdd}}）</el-button>
							<div v-show="tabList.length<tabMinAdd" class="error">最少添加{{tabMinAdd}}项菜单</div>
						</template>
					</div>
					<template v-if="!form.hidden">
						<div class="com-control-area">
							<div class="com-control-area-title">
								样式设置
							</div>
							<el-form-item label="图标字体色" prop="iconColor">
								<div class="set-color-wrap">
									<el-color-picker v-model="form.activeColor" size="medium"></el-color-picker>
									<div>选中</div>
								</div>
								<div class="set-color-wrap">
									<el-color-picker v-model="form.unActiveColor" size="medium"></el-color-picker>
									<div>未选中</div>
								</div>
							</el-form-item>
						</div>
					</template>
				</div>
			</div>
			<div class="form-footer">
				<el-button type="primary" :disabled="loading!=2" :loading="saveLoading" size="small" @click="save">保存
				</el-button>
			</div>
		</el-form>
		<el-dialog @open="addTabFormAlive=true" @closed="addTabFormAlive=false" :append-to-body="true" title="添加菜单"
			:visible.sync="addTabVisible" width="600px">
			<tabForm v-if="addTabFormAlive" @save="saveTab" @cancel="addTabVisible=false"></tabForm>
		</el-dialog>
		<el-dialog @open="editTabFormAlive=true" @closed="editTabFormAlive=false" :append-to-body="true" title="编辑菜单"
			:visible.sync="editTabVisible" width="600px">
			<tabForm v-if="editTabFormAlive" :default-form="editTabForm" @save="saveTab" @cancel="editTabVisible=false">
			</tabForm>
		</el-dialog>
	</div>
</template>

<script>
	import setLinkText from '@public/components/page-editor/coms/common/SetLinkText'
	import systemApi from '@shop/api/system'
	import draggable from 'vuedraggable'
	import tabForm from './TabForm.vue'
	import setLinkButton from '@public/components/page-editor/coms/common/SetLinkButton'
	import {
		nanoid
	} from 'nanoid'
	import {
		validateForm
	} from '@public/js/util'

	export default {
		components: {
			tabForm,
			draggable,
			setLinkText,
			setLinkButton
		},
		data() {
			return {
				loading: 0,
				model: null,
				saveLoading: false,
				addTabVisible: false,
				editTabVisible: false,
				addTabFormAlive: false,
				editTabFormAlive: false,
				editTabForm: null,
				tabMinAdd: 2,
				tabMaxAdd: 5,
				tabList: [],
				activeTabId: null,
				form: {
					activeColor: '#000000',
					unActiveColor: '#909399',
					hidden: false,
					defaultUrl: ''
				},
				rules: {
					'iconColor': [{
						validator: (rule, value, callback) => {
							if (!this.form.activeColor || !this.form.unActiveColor) {
								callback(new Error())
							}
							callback()
						},
						message: '请选择字体颜色'
					}],
					'defaultUrl': [{
						required: true,
						message: '请选择链接页面'
					}]
				}
			}
		},
		watch: {},
		created() {
			this.load()
		},
		methods: {
			load() {
				this.$request.load(systemApi.querySysParameter({
					params: {
						type: '1'
					},
					before: () => {
						this.loading = 1
					},
					success: (response) => {
						if (response.data.result) {
							this.model = response.data.result
							if (this.model.microValue) {
								this.model.microValue = JSON.parse(this.model.microValue)
								this.form.activeColor = this.model.microValue.activeColor
								this.form.unActiveColor = this.model.microValue.unActiveColor
								this.form.hidden = this.model.microValue.hidden
								this.form.defaultUrl = this.model.microValue.defaultUrl
								this.tabList = this.model.microValue.tabList
							}
						}
						this.loading = 2
					},
					error: (response) => {
						this.loading = 0
					}
				}))
			},
			saveTab(form) {
				if (form.id) {
					this.editTabVisible = false
					var item = this.tabList.find((item) => {
						return item.id == form.id
					})
					item = Object.assign(item, form)
				} else {
					this.addTabVisible = false
					this.tabList.push({
						id: nanoid(),
						...form
					})
				}
			},
			removeTab(id) {
				var index = this.tabList.findIndex((item) => {
					return item.id == id
				})
				if (index < 0)
					return
				this.tabList.splice(index, 1)
			},
			validateTab() {
				if (this.tabList.length < this.tabMinAdd || this.tabList.length > this.tabMaxAdd) {
					return false
				}
				return true
			},
			validate() {
				var result = this.validateTab()
				if (!result) {
					this.$refs.tabList.scrollIntoView({
						block: 'center',
						behavior: 'smooth'
					})
					return false
				}
				return validateForm(this.$refs.form)
			},
			createFormData() {
				var data = {
					id: this.model ? this.model.id : null,
					type: '1',
					microValue: JSON.stringify({
						...this.form,
						tabList: this.tabList
					})
				}
				return data
			},
			save() {
				var valid = this.validate()
				if (!valid) {
					this.$message.error({
						message: '请完善菜单配置信息'
					})
					return
				}
				var data = this.createFormData()
				this.$request.submit(systemApi.updateSysParameter({
					data,
					before: () => {
						this.saveLoading = true
					},
					success: (response) => {
						this.load = response.data.result
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
	@import "@public/styles/page-editor/style.scss";

	.set-tabbar-main {
		flex: 1;
		display: flex;
		padding: 20px;
	}

	.left {
		flex: 1;
		padding: 30px 0px;
		border-radius: $--border-radius-base;
	}

	.right {
		padding-top: 20px;
		padding-bottom: 20px;
		border-left: $--border-base;
		padding-left: 40px;
		width: 380px;
		font-size: $--font-size-small;
	}

	.preview {
		margin: auto;
		position: relative;
		width: 360px;
		height: 729px;
		overflow: hidden;
		background-image: url(~@public/assets/img/iPhoneX_model.png);
		background-repeat: no-repeat;
		background-size: 100%;
		border-radius: 30px;

		.canvas {
			top: 40px;
			left: 16px;
			right: 16px;
			bottom: 34px;
			position: absolute;
			border-radius: 0px 0px 20px 20px;
		}

		.tabbar {
			position: absolute;
			width: 100%;
			height: 58px;
			bottom: 0px;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: $--font-size-extra-small;
			user-select: none;
			border-top: $--border-base;

			.empty,.hidden{
				font-size: $--font-size-base;
				width: 100%;
				text-align: center;
			}
			
			.empty {
				color: $--color-danger;
			}
			
			.hidden{
				color: $--color-text-secondary;
			}

			.item-wrap {
				flex: 1;
				justify-content: center;
				height: 100%;
				padding: 6px 0;
				display: flex;
				flex-direction: row;
				flex-direction: column;
				align-items: center;
				position: relative;

				.item {
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					height: 100%;
				}

				.icon {
					img {
						width: 24px;
						height: 24px;
					}

					margin-bottom: 2px;
				}
			}
		}
	}

	.tab-list {
		margin-bottom: 10px;

		.item {
			background-color: $--color-white;
			margin-bottom: 12px;
			border-radius: $--border-radius-base;
			border: $--border-base;
			padding: 14px;
			display: flex;

			.icon-image {
				width: 66px;
				height: 66px;
				margin-bottom: 5px;
				border: $--border-base;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: $--border-radius-base;

				img {
					width: 40px;
					height: 40px;
					border: none;
					object-fit: cover;
				}
			}

			.set-unactive,
			.set-active {
				text-align: center;
				color: $--color-text-secondary;
				margin-right: 10px;
			}

			.set-config {
				flex: 1;
				height: 100%;
				display: flex;
				flex-direction: column;

				.header,
				.text {
					margin-bottom: 4px;
				}

				.text {
					padding: 6px 10px;
					background-color: $--background-color-base;
					color: $--color-text-regular;
				}

				.header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: $--font-size-base;
				}
			}
		}
	}

	.error {
		margin-top: 5px;
		font-size: $--font-size-extra-small;
		color: $--color-danger;
	}

	.set-color-wrap {
		line-height: 20px;
		text-align: center;
		display: inline-block;
		margin-right: 30px;
	}
</style>
