<!-- 倒计时按钮 -->
<template>
	<el-button v-bind="$attrs" v-on="$listeners" :disabled="countDownTime != -1 || disabled"><slot></slot><template v-if="countDownTime!=-1"> ({{countDownTime}}秒)</template></el-button>
</template>

<script>
	export default {
		props: {
			taskKey:{},
			disabled:{},
			//倒计时时间，默认60秒
			time:{
				default(){
					return 60
				}
			}
		},
		data() {
			return {
				//倒计时时间，负一标识已倒计时完成
				countDownTime:-1
			}
		},
		mounted() {
			if(this.taskKey){
				var time = localStorage.getItem('countDownTask_'+this.taskKey)
				if(time){
					//如果存在有倒计时任务未完成，则继续取上一个任务继续倒计时
					time = parseInt(localStorage.getItem('countDownTask_'+this.taskKey))
					this.beginCountDown(time)
				}
			}
		},
		methods: {
			//开始倒计时
			beginCountDown(time){
				if(!time)
					time = this.time
				this.setCountDownTime(time)
				this.count()
			},
			//计数
			count(){
				if(this.countDownTime == 0){
					this.setCountDownTime(-1)
					return
				}
				setTimeout(()=>{
					this.setCountDownTime(this.countDownTime-1)
					this.count()
				},1000)
			},
			//设置计时数，并存入本地计时任务
			setCountDownTime(value){
				this.countDownTime = value
				if(this.taskKey){
					if(value==-1){
						localStorage.removeItem('countDownTask_'+this.taskKey)
					}else{
						localStorage.setItem('countDownTask_'+this.taskKey, this.countDownTime)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
