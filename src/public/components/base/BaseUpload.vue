<script>
	import uploadFormatter from '../UploadFormatter'
	
	import {
		getFileExtension,
		qiNiuUpload
	} from '@public/js/util'
	import {
		nanoid
	} from 'nanoid'

	export default {
		mixins:[uploadFormatter],
		props: {
			value: {},
			//多选文件
			multiple: {
				default () {
					return true
				},
			},
			//文件限制数量
			limit: {
				default () {
					return null
				},
			},
			//可上传文件格式
			accept:{
				default(){
					return null
				},
			},
			//可上传文件大小(kb)
			maxSize: {
				default () {
					return 1024*2
				}
			}
		},
		computed:{
			maxLimit(){
				return this.getLimit()
			},
			uploadTip() {
				var text = []
				if(this.accept){
					text.push('支持 '+this.accept.split(',').map((item)=>{
						return item
					}).join('，')+' 格式')
				}
				var limit = this.getLimit()
				if (limit) {
					text.push('最多' + limit + '个文件')
				}
				if (this.maxSize) {
					text.push('单个文件不超过 ' + parseFloat((this.maxSize / 1024).toFixed(2)) + 'MB')
				}
				return text.join('，')
			}
		},
		watch: {
			value: {
				immediate: true,
				handler: function(value) {
					if(this.isUpdatingValue){
						this.isUpdatingValue = false
					}else{
						this.loadFileList(value)
					}
				}
			},
			loading:{
				handler(value) {
					this.$emit('update:loading',value)
				}
			}
		},
		data() {
			return {
				loading:false,
				fileList: [],
				isUpdatingValue:false
			};
		},
		created() {
		},
		methods: {
			//获取最大文件数
			getLimit(){
				return this.multiple?this.limit:1
			},
			//用于选中文件后回调，
			addFile(file){
				this.fileList.push(file)
			},
			//用于获取文件列表回调
			getFileList(){
				return this.fileList
			},
			//删除文件
			remove(id) {
				var fileList = this.getFileList()
				var index = fileList.findIndex((item) => {
					return item.id == id
				})
				if (index < 0)
					return
				fileList.splice(index, 1)
				this.updateInput()
			},
			//初始化文件列表
			loadFileList(value){
				if(!value)
					return
				value = this.parseValue(value)
				var addList = []
				if(this.multiple){
					addList = value
				}else if(value){
					addList.push(value)
				}
				var fileList = []
				addList.forEach((url)=>{
					fileList.push({
						id: nanoid(),
						url: url,
						file: {
							status: 'success'
						}
					})
				})
				this.fileList = fileList
			},
			//input file选择完成时
			async selectDone(event) {
				var fileList = event.target.files
				var currImageCount = this.getFileList().length
				var limit = this.getLimit()
				//验证文件选择数量
				if (limit && (currImageCount + fileList.length) > limit) {
					this.$message({
						type: 'error',
						message: '最多只能选择' + (limit - currImageCount) + '个文件'
					})
					return
				}
				for (var i = 0; i < fileList.length; i++) {
					var file = fileList[i]
					var status = 'ready'
					//检验文件大小
					if (this.maxSize && file.size / 1024 > this.maxSize) {
						status = 'invalidSize'
					}
					//检验文件后缀类型
					if(this.accept){
						var exists = this.accept.split(',').findIndex((name)=>{
							return name==getFileExtension(file.name)
						})
						if(exists<0)
							status = 'invalidType'
					}
					this.addFile({
						id: nanoid(),
						url: window.URL.createObjectURL(file),
						file: {
							status:status,
							percentage:0,
							raw:file
						}
					})
				}
				this.$refs.uploadInput.value = ''
			},
			updateInput() {
				this.$nextTick(()=>{
					var fileList = this.getFileList()
					var uploadFileList =  fileList.filter((item) => {
						if (item.file && item.file.status != 'success') {
							return false
						}
						return true
					})
					//拼装文件上传成功的数组
					var inputValue = uploadFileList.map((item) => {
						return item.url
					})
					//如果打开了prop的多选属性，则更新为数组，否则更新为字符串
					if(inputValue.length<=0){
						inputValue = this.multiple?[]:''
					}else{
						inputValue = this.multiple?inputValue:inputValue[0]
					}
					this.isUpdatingValue = true
					this.$emit('input', this.encodeValue(inputValue))
					this.$emit('update:upload-file-list', uploadFileList)
				})
			},
			//上传单个文件
			async uploadItem(item,callback) {
				var uploadSuccess = false
				//如果文件状态不为ready准备就绪，则不可上传
				if (item.file.status != 'ready') {
					return
				}
				item.file.status = 'uploading'
				await qiNiuUpload(item.file,(response)=>{
					//上传进度
					item.file.percentage = parseInt(response.total.percent)
				}).then((result) => {
					//上传成功
					item.file.status = 'success'
					item.url = result.url
					uploadSuccess = true
				}).catch((error) => {
					item.file.status = 'fail'
				})
				if(callback)
					callback(uploadSuccess)
			},
			//提交所有文件开始上传
			async submit() {
				var result = true
				this.loading = true
				//合并异步任务执行
				var allTask = []
				var fileList = this.getFileList()
				for (var item of fileList) {
					//如果文件状态不为ready准备就绪，则跳过上传
					if (item.file.status != 'ready') {
						continue
					}
					allTask.push(this.uploadItem(item,(uploadSuccess)=>{
						if(!uploadSuccess)
							result = false
					}))
				}
				//等待所有上传任务执行完毕后，更新v-model值
				if (allTask.length > 0)
					await Promise.all(allTask)
				this.updateInput()
				this.loading = false
				return result
			}
		}
	}
</script>
