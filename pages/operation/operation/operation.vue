<template>
	<view class="container background">
		<view class="top_box">
			<view class="top_click" @click="box_click">
				{{type_name}}
				<image class="image" src="/static/image/picker.png"></image>
			</view>
			<picker class="top_click" mode="date" :value="time" @change="DateChange($event)">
				<view class="date_text" v-if="time!==''">
					{{time}}
					<image class="image ml-10" src="/static/image/picker.png"></image>
				</view>
				<view class="date_text" v-else>
					时间
					<image class="image ml-10" src="/static/image/picker.png"></image>
				</view>
			</picker>
		</view>
		<view>
			<view v-for="(item,index) in  list" :key="index" class="itemList mb-20">
				<view class="itemList_top">
					<view>{{item.type_name}}</view>
					<view style="display: flex;align-items: center;">
						<image class="image" src="/static/image/time.png"></image>
						{{item.create_time}}
					</view>
				</view>
				<view class="itemList_bottom">
					<view class="">
						{{item.brief}}
					</view>
					<view class="itemList_bottom_text" @click="details(item)" style="display: flex;align-items: center;">
						详情
						<image class="image" src="/static/image/you.png"></image>
					</view>
				</view>
			</view>
		</view>
		<uni-popup class="prop_bottom" ref="popups" type="top" :maskClick="false">
			<view class="prop_top">
				<view class="top_click" @click="prop_close">
					{{type_name}}
					<image class="image" src="/static/image/picker.png"></image>
				</view>
			</view>
			<view class="prop_bottom_bottom">
				<view v-for="(item,index) in operation" :key="index"  @click="prop_click(item,index)" class="prop_box_list" >
					<view class="prop_box" v-if="item.sta" style="background: #EBF8FF;color: #57B3FC;">{{item.name}}</view>
					<view class="prop_box" v-else>{{item.name}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:'',
				operation:[],
				list:[],
				type_id:'',
				type_name:'',
				page:0,
			}
		},
		onLoad() {
			// 操作类型列表接口
			this.http({
			    url: this.api.operation_type,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid")
			    },
			    success: res => {
			        this.operation = res
					this.type_name = res[0].name
					this.type_id = res[0].id
					this.operation.map(item=>{
						if(this.type_id == item.id) {
							item.sta = 1
						} else {
							item.sta = 0
						}
					})
			    }
			})
			setTimeout(()=>{
				this.listInterface()
			},500)
		},
		//上拉触底函数
		onReachBottom(){
			// 列表接口
			this.http({
			    url: this.api.operation_list,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
			        time:this.time,
			        type_id:this.type_id,
			        page:this.page
			    },
			    success: res => {
					this.page+=1
					if(res.list.length == 0) {
						uni.showToast({
							title:'没有更多了',
							icon:'none',
							duration: 2000
						})
					} else {
						this.list = this.list.concat(res.list)
					}
			    }, 
			})
		},
		methods: {
			// 列表接口
			listInterface() {
				this.page = 0
				this.http({
				    url: this.api.operation_list,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						time:this.time,
						type_id:this.type_id,
						page:this.page
				    },
				    success: res => {
				        this.list = res.list
				    }
				})
			},
			// 选择日期
			DateChange(eve) {
				this.time =  eve.detail.value
				this.listInterface()
			},
			// 选择点击
			box_click() {
				this.$refs.popups.open();
			},
			// 点击操作方式
			prop_click(eve,i) {
				console.log(eve,i)
				this.type_name = eve.name
				this.type_id = eve.id
				this.operation.map(item=>{
					if(this.type_id == item.id) {
						item.sta = 1
					} else {
						item.sta = 0
					}
				})
				this.$refs.popups.close();
				this.listInterface()
			},
			// 关闭弹窗
			prop_close() {
				this.$refs.popups.close();
			},
			// 详情按钮点击
			details(eve){
				uni.navigateTo({
					url:'/pages/operation/details/details?data='+encodeURIComponent(JSON.stringify(eve))
				})
			}
		}
	}
</script>

<style lang="scss">
.background {
	background: #F8F8F8;
}
.top_box {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40rpx;
}
.top_click {
	height: 60rpx;
	padding: 0 50rpx;
	line-height: 60rpx;
	background: #FFFFFF;
	border-radius: 30rpx;
	font-size: 28rpx;
	font-weight: 400;
	color: #2F2F2F;
	.image {
		width: 16rpx;
		height: 10rpx;
		margin-left: 10rpx;
	}
}
.prop_bottom {
	.prop_top {
		padding: 30rpx 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: #F8F8F8;
	}
	.prop_bottom_bottom {
		padding: 30rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		.prop_box {
			width: 210rpx;
			height: 96rpx;
			line-height: 96rpx;
			background: #F6F6F6;
			border-radius: 30rpx;
			text-align: center;
			margin-bottom: 20rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #666666;
		}
	}
}
.prop_box_list {
	width: 33.33%;
	display: flex;
	justify-content: space-around;
}
.itemList {
	font-weight: 400;
	color: $color-3;
	padding: 30rpx;
	background: $color-f;
	box-shadow: 0rpx 2rpx 16rpx 2rpx rgba(179, 175, 175, 0.25);
	border-radius: 8rpx;
	.itemList_top {
		padding-bottom: 30rpx;
		border-bottom: 2rpx solid #F6F6F6;
		display: flex;
		align-items:center;
		justify-content: space-between;
		font-size: 20rpx;
		image {
			width: 24rpx;
			height: 24rpx;
			margin-right: 20rpx;
		}
	}
	.itemList_bottom {
		display: flex;
		align-items:center;
		justify-content: space-between;
		margin-top: 24rpx;
		font-size: 28rpx;
		image {
			width: 16rpx;
			height: 26rpx;
			margin-left: 10rpx;
		}
	}
	.itemList_bottom_text {
		font-size: 20rpx;
		color: $color-9;
	}
}
</style>
