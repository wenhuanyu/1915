<template>
	<view class="background fix-padding">
		<view class="details_list">
			<view v-for="item in list" class="details_item flex_between">
				<view>
					<view class="details_item_list">
						<view class="title">商品名称</view>
						<view class="value">{{item.goods_name}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">采购数量</view>
						<view class="value">{{item.count}}</view>
					</view>
					<!-- <view class="details_item_list">
						<view class="title">商品单价</view>
						<view class="value">￥{{item.price}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">商品总价</view>
						<view class="value">￥{{item.total_price}}</view>
					</view> -->
					<view class="details_item_list">
						<view class="title">采购仓库</view>
						<view class="value">{{item.warehouse_name}}</view>
					</view>
					<!-- <view class="details_item_list">
						<view class="title">客户名称</view>
						<view class="value">{{item.merchant_name}}</view>
					</view> -->
					<view class="details_item_list">
						<view class="title">供应商名</view>
						<view class="value">{{item.apply_name}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">采购员名</view>
						<view class="value">{{item.business_people}}</view>
					</view>
					<view class="details_item_list" v-if="check_user">
					    <view class="title">审核员名</view>
					    <view class="value">{{check_user}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">备注内容</view>
						<view class="value">{{item.remark}}</view>
					</view>
				</view>
				<image v-if="item.image" class="image" :src="item.image"></image>
				<image v-else class="image" src="/static/image/default.png"></image>
			</view>
		</view>
		<view class="details_note">
			<view class="title">采购备注</view>
			<view class="value">{{remark}}</view>
		</view>
		<view class="container fix-bottom" v-if="list[0].check_status == 3">
			<button class="btn-submit" @click="submit_shenhe" >入库</button>
			<!-- <button class="btn-submit" style="background:#F96164 ;" @click="submit_jujue">审核拒绝</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				purchase_id:'',
				list:[],
				remark:'',
				check_user:''
			}
		},
		onLoad(option) {
			console.log('option',option)
			if(option.data) {
				this.purchase_id = JSON.parse(decodeURIComponent(option.data))
				this.listInterface()
			}
			
		},
		methods: {
			// 返回上一页
			previous() {
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.navigateBack({
				    success: function() {
				        beforePage.onLoad(); // 执行上一页的onLoad方法
				    }
				});
			},
			submit_shenhe() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.warehouse_input_submit,
							    method: "POST",
							    data: {
							        uid: this.common.get("uid"),
							        purchase_id:this.purchase_id,
							    },
							    success: res => {
									uni.showToast({
										title:'操作成功',
										icon:'none',
										duration: 2000
									})
									setTimeout(() =>{
										this.previous()
									},500) 
							    }
							})
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 接口列表
			listInterface() {
				this.http({
				    url: this.api.warehouse_purchase_details,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        purchase_id:this.purchase_id
				    },
				    success: res => {
				        this.list = res.list
						this.remark = res.remark
						this.check_user = res.info.check_user
				    }
				})
			},
		}
	}
</script>

<style lang="scss">
.background {
	// background: #F6F6F6;
}
.details_list {
	margin-bottom: 20rpx;
	.details_item {
		display: flex;
		align-items: flex-start;
		width: 100%;
		padding: 20rpx 30rpx;
		background: $color-f;
		 box-sizing: border-box;
		 border-bottom: 2rpx solid #ECECEC;
		.details_item_list {
			display: flex;
			flex-direction: row;
			font-size: 28rpx;
			height: 50rpx;
			line-height: 50rpx;
			margin-bottom: 20rpx;
			.title {
				font-weight: 400;
				color: $color-6;
				margin-right: 40rpx;
			}
			.value {
				font-weight: 500;
				color: $color-3;
			}
		}
		.image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 8rpx;
			border: 2rpx solid #E7E7E7;
		}
	}
}
.details_note {
	background: $color-f;
	padding: 20rpx 30rpx;
	display: flex;
	flex-direction: row;
	font-size: 28rpx;
	height: 50rpx;
	line-height: 50rpx;
	.title {
		font-weight: 400;
		color: $color-6;
		margin-right: 40rpx;
	}
	.value {
		font-weight: 500;
		color: $color-3;
	}
}

</style>
