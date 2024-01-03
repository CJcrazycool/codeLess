<!-- 上传文件格式化 -->
<script>
	export default {
		props: {
			//可传入object,json,或其他分割符号，默认为逗号分割。
			valueFormatter:{
				default(){
					return ','
				}
			}
		},
		methods:{
			parseValue(value){
				if(!value)
					return value
				if(this.valueFormatter == 'object'){
					return value
				}
				if (this.multiple){
					return this.valueFormatter == 'json'?JSON.parse(value):value.split(this.valueFormatter)
				}
				return value
			},
			encodeValue(value){
				if(!value)
					return value
				if(this.valueFormatter == 'object'){
					return value
				}
				if (this.multiple){
					return this.valueFormatter=='json'?JSON.stringify(value):value.join(this.valueFormatter)
				}
				return value
			}
		}
	}
</script>
