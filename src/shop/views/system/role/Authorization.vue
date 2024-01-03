<script>
	import authorization from '@public/views/Authorization'
	import systemRoleApi from '@shop/api/systemRole'

	export default {
		mixins:[authorization],
		props: {
		},
		components: {},
		data() {
			return {
				saveApi:systemRoleApi.saveAuthorization,
				treeListApi:systemRoleApi.permissionTreeList
			}
		},
		computed: {},
		watch: {},
		created() {
		},
		methods: {	
			beforeLoad(data){
				data.roleId = this.id
			},
			beforeSave(data,permissionIds){
				data.roleId = this.id
				data.permissionIds = permissionIds
			}
		}
	}
</script>