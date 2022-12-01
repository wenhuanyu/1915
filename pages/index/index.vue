<template>
    <view>
        <view>
            <view class="banner flex">
                <image class="image" :src="logoImage"></image>
                <view class="name">
                    {{name}}
                </view>
            </view>

            <view v-if="isLogin" class="container">
				<view class="title_text">库存区</view>
				<view class="line"></view>
                <view class="guide">
                    <block v-for="item in guide" :key="item.title">
                        <view class="item" @click="jump(item.id)">
							<view class="icon_text">
								<view>
									<image :src="item.icon"></image>
								</view>
								<view class="icon_title">{{item.title}}</view>
							</view>
                        </view>
                    </block>
                </view>
            </view>
			<!-- <view v-if="isLogin" class="container"> -->
				<!-- <view class="title_text">办公区</view> -->
				<!-- <view class="line"></view> -->
			   <!-- <view class="guide">
			        <block v-for="item in guide" :key="item.title">
			            <view class="item" @click="jump(item.id)">
							<view class="icon_text">
								<view>
									<image :src="item.icon"></image>
								</view>
								<view class="icon_title">{{item.title}}</view>
							</view>
			            </view>
			        </block>
			    </view> -->
			<!-- </view> -->
        </view>
    </view>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                isLogin: false,
                name: "",
				logoImage:'',
                guide: []
            }
        },
        onLoad() {
            let state = this.common.get("state")
            if (state == 1) {
                uni.reLaunch({
                    url: "/pages/login/login"
                })
                return
            } else if (state == 2) {
                this.isLogin = true
            } else {
                // this.name = "云仓储"
                uni.switchTab({
                    url: "/pages/user/user"
                })
            }
			this.index_list()
        },
		onShow() {
		    let uid = this.common.get("uid")
		    if (uid != "") {
		        this.http({
		            url: this.api.merchant,
		            method: "POST",
		            data: {
		                uid: uid
		            },
		            success: res => {
		                this.name = res.shop_name
						this.logoImage = res.shop_logo
		            }
		        })
		    } else {
				uni.switchTab({
				    url: "/pages/user/user"
				})
			}
		},
        methods: {
			// 主页功能列表接口
			index_list() {
				this.http({
					url:this.api.index,
					method: "POST",
					data:{
						uid: this.common.get("uid")
					},
					success:res =>{
						this.guide = res
					}
				})
			},
			// 页面跳转
			jump(item) {
				console.log('item',item)
				// 库存管理
				if(item == 29) {
					uni.navigateTo({
					    url: "/pages/stock/stock"
					})
				}
				// 出库
				if(item == 30) {
					uni.navigateTo({
					    url: "/pages/outbound/outbound/outbound"
					})
				}
				// 入库
				if(item == 31) {
					uni.navigateTo({
					    url: "/pages/ruku/ruku/ruku"
					})
				}
				// 工具箱
				if(item == 32) {
					// uni.navigateTo({
					//     url: "/pages/transfers/transfers/transfers"
					// })
					uni.showToast({
						title:'暂未开放',
						icon:'none',
						duration: 2000
					})
				}
				// 库存盘点
				if(item == 33) {
					uni.navigateTo({
					    url: "/pages/inventory/inventory/inventory"
					})
				}
				// 调拨
				if(item == 44) {
					// uni.navigateTo({
					//     url: "/pages/transfers/transfers/transfers"
					// })
					uni.showToast({
						title:'暂未开放',
						icon:'none',
						duration: 2000
					})
				}
				// 利润统计
				if(item == 47) {
					uni.navigateTo({
					    url: "/pages/profits/profits/profits"
					})
				}
				// 业绩统计
				if(item == 45) {
					uni.navigateTo({
					    url: "/pages/results/results/results"
					})
				}
				// 采购申请
				if(item == 48) {
					uni.navigateTo({
					    url: "/pages/procurementAdd/procurementList/procurementList"
					})
				}
				// 采购审核
				if(item == 49) {
					uni.navigateTo({
					    url: "/pages/procurement/procurement/procurement"
					})
				}
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
        .image {
            width: 100rpx;
            height: 100rpx;
            margin-right: 30rpx;
			border-radius: 50%;
        }
    }
	.container {
		width: 690rpx;
		margin: 20rpx 30rpx;
		background: #ffffff;
		box-shadow: 0rpx 4rpx 8rpx 2rpx rgba(153, 153, 153, 0.19);
		border-radius: 30rpx;
		.title_text {
			height: 40rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			line-height: 40rpx;
			margin-left: 40rpx;
			margin-bottom: 20rpx;
		}
		.line {
			height: 2rpx;
			border: 2rpx solid #f6f6f6;
			box-sizing: border-box;
		}
		.guide {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.item {
				width: 25%;
			}
		}
	}
    .icon_text {
		image {
			width: 88rpx;
			height: 88rpx;
			margin-top: 20rpx;
		}
		.icon_title {
			font-size: 28rpx;
			height: 40rpx;
			line-height: 40rpx;
			margin-top: 20rpx;
			color: #888888;
		}
	}
</style>
