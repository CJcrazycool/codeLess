<!-- 画布组件，如果有新的组件需要开发，请先混入该文件 -->
<script>
	export default {
		props: {
			defaultComAttrs: {
				default () {
					return null
				}
			}
		},
		methods: {
			//该方式是默认组件的属性，例如默认样式
			getDefaultComAttrs(){
				return {}
			}
		},
		created() {
			this.comAttrs = this.defaultComAttrs ? this.defaultComAttrs : this.getDefaultComAttrs()
		},
		data() {
			return {
				comAttrs: {}
			};
		},
	};
</script>