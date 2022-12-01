<template>
	<view>
		<view class="container" style="border-bottom: 2rpx solid #E5E5E5; font-size: 32rpx;">{{type_name}}</view>
		<view class="container" style="font-size: 24rpx; color: $color-6;" v-html="content"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				help_id:'',
				type_name:'',
				content:'',
			}
		},
		onLoad(option) {
			console.log('option',option)
			if(option.data) {
				this.help_id = JSON.parse(decodeURIComponent(option.data)).id
				this.listInterface()
			}
		},
		methods: {
			// 详情接口
			listInterface() {
				this.http({
				    url: this.api.help_details,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        help_id:this.help_id
				    },
				    success: res => {
						this.type_name = res.title
						this.content = res.content
				    }
				})
			},
		}
	}
</script>

<style>

</style>
