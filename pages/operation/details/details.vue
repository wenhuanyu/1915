<template>
	<view>
		<view class="container" style="border-bottom: 2rpx solid #E5E5E5; font-size: 32rpx;">{{type_name}}</view>
		<view class="container" style="font-size: 24rpx; color: $color-6;">{{content}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				operation_id:'',
				type_name:'',
				content:'',
			}
		},
		onLoad(option) {
			console.log('option',option)
			if(option.data) {
				this.operation_id = JSON.parse(decodeURIComponent(option.data)).id
				this.listInterface()
			}
		},
		methods: {
			// 详情接口
			listInterface() {
				this.http({
				    url: this.api.operation_details,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        operation_id:this.operation_id
				    },
				    success: res => {
						this.type_name = res.type_name
						this.content = res.content
				    }
				})
			},
		}
	}
</script>

<style>

</style>
