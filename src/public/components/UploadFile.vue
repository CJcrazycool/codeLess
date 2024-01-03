<!-- 文件上传 -->
<template>
	<div class="upload-file">
		<div v-if="fileList.length>0" class="file-list">
			<div v-for="item in fileList" class="file-item">
				<div class="file-name">
					<template v-if="item.file.status=='ready'">等待上传 {{item.file.raw.name}}</el-progress></template>
					<template v-if="item.file.status =='uploading'">
						<i class="el-icon-loading"></i> 正在上传<el-progress class="upload-progress" :stroke-width="2"
							:percentage="item.file.percentage" :show-text="false"></el-progress>
					</template>
					<template v-else-if="item.file.status=='fail'">
						<span class="text-danger"><i class="el-icon-error"></i> 上传失败 {{item.file.raw.name}}</span>
					</template>
					<template v-else-if="item.file.status=='success'">
						<span class="text-success"><i class="el-icon-check"></i> {{getResourceUrl(item.url).url}}</span>
					</template>
					<template v-else-if="item.file.status=='invalidSize'">
						<span class="text-danger"><i class="el-icon-error"></i> 文件过大 {{item.file.raw.name}}</span>
					</template>
					<template v-else-if="item.file.status=='invalidType'">
						<span class="text-danger"><i class="el-icon-error"></i> 文件格式无效 {{item.file.raw.name}}</span>
					</template>
				</div>
				<div class="operate">
					<el-button v-if="!(item.file.status=='uploading')" type="text" size="mini" icon="el-icon-delete"
						@click="remove(item.id)">删除</el-button>
				</div>
			</div>
		</div>
		<el-button v-if="!maxLimit || fileList.length<maxLimit" type="primary" size="small" icon="el-icon-plus" @click="$refs.uploadInput.click()"
			:loading="loading">选择文件</el-button>
		<div v-if="uploadTip"><span class="tip">{{uploadTip}}</span></div>
		<input ref="uploadInput" style="display: none;" type="file" name="file" @change="selectDone($event)"
			:multiple="multiple" :accept='accept'>
	</div>
</template>

<script>
	import baseUpload from './base/BaseUpload'
	import {
		getResourceUrl
	} from '@public/js/util'

	export default {
		mixins:[baseUpload],
		props: {
		},
		computed: {
		},
		data() {
			return {
				getResourceUrl
			}
		},
		watch: {
		},
		created() {},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.upload-progress {
		width: 60px;
		display: inline-block;
		margin-left: 10px;
		vertical-align: middle;
	}

	.file-list {
		margin-bottom: 10px;
	}

	.file-item {
		display: flex;
		justify-content: space-between;
		border:$--border-base;
		padding: 0px 15px;
		border-radius: $--border-radius-base;
		font-size: $--font-size-extra-small;
		margin-bottom: 8px;

		&:last-child {
			margin-bottom: 0px;
		}
	}
</style>
