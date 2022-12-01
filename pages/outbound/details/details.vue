<template>
	<view class="background">
		<view class="details_list">
			<view v-for="item in list" class="details_item flex_between">
				<view>
					<view class="details_item_list">
						<view class="title">商品名称</view>
						<view class="value">{{item.goods_name}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">商品数量</view>
						<view class="value">{{item.count}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">商品单价</view>
						<view class="value">￥{{item.price}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">商品总价</view>
						<view class="value">￥{{item.total_price}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">仓库位置</view>
						<view class="value">{{item.warehouse_name}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">客户名称</view>
						<view class="value">{{item.merchant_name}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">业务员名</view>
						<view class="value">{{item.business_people}}</view>
					</view>
				</view>
				<image v-if="item.image" class="image" :src="item.image"></image>
				<image v-else class="image" src="/static/image/default.png"></image>
			</view>
		</view>
		<view class="details_note">
			<view class="title">出库备注</view>
			<view class="value">{{remark}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				import_id:'',
				list:[],
				remark:''
			}
		},
		onLoad(option) {
			console.log('option',option)
			if(option.data) {
				this.export_id = JSON.parse(decodeURIComponent(option.data))
				this.listInterface()
			}
			
		},
		methods: {
			// 接口列表
			listInterface() {
				this.http({
				    url: this.api.export_details,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        export_id:this.export_id
				    },
				    success: res => {
				        this.list = res.list
						this.remark = res.remark
				    }
				})
			},
		}
	}
</script>

<style lang="scss">
.background {
	background: #F6F6F6;
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
