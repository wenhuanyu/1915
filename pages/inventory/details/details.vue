<template>
	<view class="background">
		<view class="details_list">
			<view v-for="item in list" class="details_item flex_between">
				<view>
					<view class="details_item_list">
						<view class="title">商品条码</view>
						<view class="value">{{item.bar_code}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">商品名称</view>
						<view class="value">{{item.good_name}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">商品分类</view>
						<view class="value">{{item.cate_name}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">盘前库存</view>
						<view class="value">{{item.num}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">盘点库存</view>
						<view class="value">{{item.check_num}}</view>
					</view>
					<view class="details_item_list">
						<view class="title">盘点人</view>
						<view class="value">{{item.user_name}}</view>
					</view>
					
					<view class="details_item_list">
						<view class="title">仓库名</view>
						<view class="value">{{item.ware_name}}</view>
					</view>
					<view class="details_item_list">
						<view class="title" v-if="item.type == 1">盘盈</view>
						<view class="title" style="color:#F96164 ;" v-if="item.type == 2">盘亏</view>
						<view class="value" v-if="item.type == 1">{{item.nums}}</view>
						<view class="value" style="color:#F96164 ;" v-if="item.type == 2">{{item.nums}}</view>
					</view>
				</view>
				<image v-if="item.image" class="image" :src="item.image"></image>
				<image v-else class="image" src="/static/image/default.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				import_id:'',
				list:[],
			}
		},
		onLoad(option) {
			if(option.data) {
				this.export_id = JSON.parse(decodeURIComponent(option.data))
				this.listInterface()
			}
			
		},
		methods: {
			// 接口列表
			listInterface() {
				this.http({
				    url: this.api.check_detail,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        id:this.export_id
				    },
				    success: res => {
				        this.list = res
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
				width: 112rpx;
				text-align: justify;
				text-align-last: justify;
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
