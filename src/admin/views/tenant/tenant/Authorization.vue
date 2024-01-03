<script>
	import authorization from '@public/views/Authorization'
	import tenantApi from '@admin/api/tenant'

	export default {
		mixins:[authorization],
		props: {
		},
		components: {},
		data() {
			return {
				saveApi:tenantApi.saveAuthorization,
				treeListApi:tenantApi.permissionTreeList
			}
		},
		computed: {},
		watch: {},
		created() {
		},
		methods: {	
			beforeLoad(data){
				data.companyId = this.id
			},
			beforeSave(data,permissionIds){
				data.companyId = this.id
				data.menuIds = permissionIds
			}
		}
	}
</script>