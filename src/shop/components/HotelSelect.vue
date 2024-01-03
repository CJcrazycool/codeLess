<!-- 选择酒店 -->
<template>
	<div class="select-button">
		<div class="select-body">
			<el-button class="select-result" @click="open" v-bind="buttonAttrs" v-on="buttonListeners">
				<hotelNameText v-if="selectId" @load-success="data=>$emit('select-data',data)" :id="selectId" :text="hotelName"></hotelNameText><template v-else>选择酒店</template>
			</el-button>
			<el-button v-if="selectId" @click="remove" class="remove btn-text-info" icon="el-icon-close" type="text"></el-button>
		</div>
		<selectHotelDialog ref="selectHotelDialog" :multiple="false"></selectHotelDialog>
	</div>
</template>

<script>
	import selectHotelDialog from '@shop/components/select-dialog/SelectHotelDialog'
	import hotelNameText from './HotelNameText'
	
	export default {
		props: {
			value: {},
			buttonAttrs: {
				default () {
					return null
				}
			},
			buttonListeners: {
				default () {
					return null
				}
			}
		},
		components: {
			selectHotelDialog,
			hotelNameText
		},
		data() {
			return {
				selectId:this.value,
				hotelName:''
			}
		},
		watch: {
		},
		computed: {
		},
		created(){
		},
		methods: {
			open(){
				this.$refs['selectHotelDialog'].open((row) => {
					this.selectId = row.id
					this.hotelName = row.anotherName
					this.$emit('input',this.selectId)
					this.$emit('select-data',row)
				})
			},
			remove(){
				this.selectId = null
				this.$emit('input',null)
				this.$emit('select-data',null)
				this.$emit('remove')
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.select-button{
		display: inline-block;
		max-width: 100%;
	}
	
	.select-body{
		display: flex;
		width: 100%;
		flex-direction: row;
		align-items: center;
	}
	
	.select-result{
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.remove{
		margin-left: 6px !important;
	}
</style>