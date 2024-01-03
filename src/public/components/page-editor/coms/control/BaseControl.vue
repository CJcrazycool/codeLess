<!-- 组件控制台，如果有新的组件控制台需要开发，请先混入该文件 -->
<script>
	export default {
		props: {
			comId:null,
			canvas:{}
		},
		data() {
			return {
				comObj:null,
				//画布上的组件属性，通过该属性可直接控制画布组件的属性或样式
				comAttrs:null
			};
		},
		created() {
			var comObj = this.$parent.getCanvasComObject(this.comId)
			this.comObj = comObj
			if(comObj)
				this.comAttrs = comObj.comAttrs
		},
		methods: {
		}
	};
</script>