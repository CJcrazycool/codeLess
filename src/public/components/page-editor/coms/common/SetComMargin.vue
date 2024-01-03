<!-- 设置边距组件 -->
<template>
	<div class="com-control-area">
		<div class="com-control-area-title">
			边距设置
		</div>
		<el-form-item class="large-label column-content">
			<el-col class="column-label" :span="4">左</el-col>
			<el-col :span="6">
				<el-input-number :max="maxX" v-model="margin.left" controls-position="right" :min="0"
					@change="checkLinkX">
				</el-input-number>
			</el-col>
			<el-col class="column-label" :span="4">右</el-col>
			<el-col :span="6">
				<el-input-number :max="maxX" v-model="margin.right" controls-position="right" :min="0"
					@change="checkLinkX">
				</el-input-number>
			</el-col>
			<el-col class="column-label" :span="4">
				<div><i class="el-icon-paperclip link" :class="{active:margin.linkX}" @click="margin.linkX = !margin.linkX"></i></div>
			</el-col>
		</el-form-item>
		<el-form-item class="column-content">
			<el-col class="column-label" :span="4">上</el-col>
			<el-col :span="6">
				<el-input-number :max="maxY" v-model="margin.top" controls-position="right" :min="0"
					@change="checkLinkY">
				</el-input-number>
			</el-col>
			<el-col class="column-label" :span="4">下</el-col>
			<el-col :span="6">
				<el-input-number :max="maxY" v-model="margin.bottom" controls-position="right" :min="0"
					@change="checkLinkY">
				</el-input-number>
			</el-col>
			<el-col class="column-label" :span="4">
				<div><i class="el-icon-paperclip link" :class="{active:margin.linkY}" @click="margin.linkY = !margin.linkY"></i></div>
			</el-col>
		</el-form-item>
	</div>
</template>

<script>
	export default {
		props: {
			margin: {
				default () {
					return {
						left: '0',
						right: '0',
						linkX:true,
						top: '0',
						bottom: '0',
						linkY:true,
					}
				}
			},
		},
		components: {},
		computed: {},
		data() {
			return {
				maxX:20,
				maxY:50
			};
		},
		created() {},
		methods: {
			checkLinkX(value) {
				if (this.margin.linkX) {
					this.margin.left = value
					this.margin.right = value
				}
			},
			checkLinkY(value) {
				if (this.margin.linkY) {
					this.margin.top = value
					this.margin.bottom = value
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.link {
		padding: 5px;
		border-radius: $--border-radius-small;
		cursor: pointer;
		transition: $--all-transition;

		&.active {
			background-color: rgba($--color-black, .1);
		}
	}
</style>