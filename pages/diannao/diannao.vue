<template>
	<view class="container">
		<view class="add_title">电脑端入口说明</view>
		<view class="text">1.推荐使用Chrome浏览器、Firefox浏览器</view>
		<view class="text">2.进行出入库操作和报表的打印</view>
		<button class="btn-submit" @click="copy">复制网址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			copy() {
				let copy_text = ''
				this.http({
					url:this.api.copy,
					method:"POST",
					data:{
						uid: this.common.get("uid")
					},
					success:res =>{
						copy_text = res
						wx.setClipboardData({
							data:copy_text,
							showToast:false,
							success() {
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.add_title {
	margin-bottom: 40rpx;
}
.text {
	height: 50rpx;
	line-height: 50rpx;
	font-size: 28rpx;
	font-weight: 400;
	color: $color-3;
	margin-bottom: 30rpx;
}
.btn-submit {
	margin-top: 60rpx;
}
</style>
