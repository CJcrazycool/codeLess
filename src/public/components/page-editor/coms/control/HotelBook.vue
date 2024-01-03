<template>
	<div class="com-control-hotelbook">
		<el-form class="com-control-form" @submit.native.prevent ref="form" :model="comAttrs" size="small" :rules="rules">
			<div class="com-control-area">
				<div class="com-control-area-title">预订类型</div>
				<el-form-item>
					<el-checkbox-group v-model="comAttrs.type">
					    <el-checkbox :disabled="disableType('day')" label="day">全天房</el-checkbox>
					    <el-checkbox :disabled="disableType('hour')" label="hour">钟点房</el-checkbox>
					  </el-checkbox-group>
				</el-form-item>
				<el-form-item label="预订方式">
					<el-radio-group v-model="comAttrs.method">
						<el-radio label="search">搜索酒店</el-radio>
						<el-radio label="appoint">指定酒店</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-if="comAttrs.method =='appoint'" label="选择指定酒店" prop="appointHotel" key="appointHotel">
					<hotelSelect v-model="comAttrs.appointHotel" @select-data="updateAppointHotel" :button-attrs="{type:'text',icon:'el-icon-link',size:'medium'}"></hotelSelect>
				</el-form-item>
			</div>
			<div class="com-control-area">
				<div class="com-control-area-title">样式设置</div>
				<el-form-item label="卡片边角">
					<el-radio-group v-model="comAttrs.style.radius">
						<el-radio label="default">直角</el-radio>
						<el-radio label="round">圆角</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="按钮边角">
					<el-radio-group v-model="comAttrs.style.buttonRadius">
						<el-radio label="default">直角</el-radio>
						<el-radio label="mini">小圆角</el-radio>
						<el-radio label="round">圆角</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="卡片阴影">
					<el-radio-group v-model="comAttrs.style.shadow">
						<el-radio label="none">无投影</el-radio>
						<el-radio label="shadow">投影</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="重叠高度">
					 <el-slider :min="0" :max="100" v-model="comAttrs.style.overHeight"></el-slider>
				</el-form-item>
			</div>
			<setComMargin :margin="comAttrs.style.padding"></setComMargin>
		</el-form>
	</div>
</template>

<script>
	import baseControl from './BaseControl.vue'
	import setComMargin from '../common/SetComMargin'
	import hotelSelect from '@shop/components/HotelSelect'
	import {validateForm} from '@public/js/util'

	export default {
		mixins: [baseControl],
		components: {
			setComMargin,
			hotelSelect
		},
		computed:{
			disableType(){
				return (value)=>{
					if(this.comAttrs.type.length<=1){
						for(var i in this.comAttrs.type){
							if(this.comAttrs.type[i]==value)
								return true
						}
					}
					return false
				}
			}
		},
		data() {
			return {
				rules: {
					'appointHotel': [{
							required: true,
							message: '请选择酒店'
						}
					]
				}
			};
		},
		created() {
		},
		methods: {
			validate() {
				var result = validateForm(this.$refs['form'])
				return result
			},
			updateAppointHotel(data){
				this.comObj.$emit('updateAppointHotel',data)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
