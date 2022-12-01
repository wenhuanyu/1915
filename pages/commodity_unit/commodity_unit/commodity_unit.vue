<template>
	<view>
		<view class="banner flex">
			<navigator url="/pages/commodity_unit/add/add">
				<button class="button">
					<image src="/static/image/jia.png"></image>
					<view>添加单位</view>
				</button>
			</navigator>
		</view>
		<view class="container">
			<view class="itemList mb-20" v-for="(item,index) in list" :key="item.id">
				<view>
					<view class="mr-20">单位</view>
					<view>{{item.unit_name}}</view>
				</view>
				<view>
					<button class="button button_color mr-20" @click="editor(item)">编辑</button>
					<button class="button"  @click="del(item)">删除</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
			}
		},
		onLoad() {
			this.listInterface()
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
				    url: this.api.shop_unit,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				    },
				    success: res => {
				        this.list = res
				    }
				})
			},
			// 编辑
			editor(eve) {
				uni.navigateTo({
					url:'/pages/commodity_unit/add/add?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
			// 删除
			del(eve) {
				uni.showModal({
					title: '提示',
					content: '确定要删除当前单位？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.deleteShopUnit,
								method:"POST",
								data:{
									uid: this.common.get("uid"),
									unit_id:eve.id
								},
								success:res =>{
									this.listInterface()
								}
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
.banner {
    width: 750rpx;
    height: 192rpx;
    background: #2E74F4;
    box-sizing: border-box;
    padding: 30rpx;
    color: $color-f;
	display: flex;
	align-items: center;
	justify-content: center;
	.button {
		width: 280rpx;
		height: 80rpx;
		background: #ffffff;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-size: 400;
		color: #5793FF;
		display: flex;
		align-items: center;
		justify-content: center;
		image {
			width: 24rpx;
			height: 24rpx;
			margin-right: 6rpx;
		}
	}
}
.itemList {
	font-size: 28rpx;
	font-weight: 400;
	color: #3D4154;
	padding: 30rpx;
	background: $color-f;
	box-shadow: 0rpx 2rpx 16rpx 2rpx rgba(179, 175, 175, 0.25);
	border-radius: 8rpx;
	display: flex;
	justify-content: space-between;
	align-items:center;
	>view {
		display: flex;
		.button {
			height: 40rpx;
			line-height: 40rpx;
			padding: 0 14rpx;
			font-size: 20rpx;
			font-weight: 400;
			color: $color-f;
			background: #F96164;
			border-color: #F96164!important;
		}
		.button_color {
			background: #F9B261;
			border-color: #F9B261!important;
		}
	}
}
</style>
