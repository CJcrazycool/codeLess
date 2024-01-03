<!-- 图片上传 -->
<template>
	<div class="upload-image">
		<uploadImageList ref="imageList" :value="fileList" :limit="maxLimit" v-bind="$attrs" v-on="$listeners"
			@change="updateInput" @upload="$refs.uploadInput.click()"><slot></slot></uploadImageList>
		<div v-if="uploadTip" class="tip">
			{{uploadTip}}
		</div>
		<input ref="uploadInput" style="display: none;" type="file" name="file" @change="selectDone($event)"
			:multiple="multiple" :accept='accept'>
	</div>
</template>

<script>
	import baseUpload from './base/BaseUpload'
	import uploadImageList from './UploadImageList'

	export default {
		mixins:[baseUpload],
		components: {
			uploadImageList
		},
		props: {
			//可上传文件格式
			accept:{
				default(){
					return '.jpg,.jpeg,.png,.gif'
				},
			},
		},
		computed:{
		},
		watch: {
		},
		data() {
			return {};
		},
		created() {
		},
		methods: {
			addFile(file){
				this.$refs.imageList.add(file)
			},
			getFileList(){
				return this.$refs.imageList.images
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
