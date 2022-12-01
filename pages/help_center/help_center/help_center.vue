<template>
	<view class="background">
		<view class="container input-search">
			<view class="flex " style="position: relative;">
				<uni-easyinput class="input" v-model="search_name" @input="name($event)" placeholder="搜索答案"></uni-easyinput>
				<button class="btn-search" @click="search">搜索</button>
				<view v-if="searchShow" class="search_list">
					<view v-for="(i,e) in search_list" :key="e"  @click="searchChange(i,e)" class="price_item" >
						<view>{{i.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-for="(item,index) in list" :key="index" class="mb-10">
			<view class="help_list_box container" @click="detail(item,index)">
				<view>{{item.name}}</view>
				<image class="image" src="/static/image/picker.png"></image>
			</view>
			<view v-for="(item1,index1) in item.last" :key="index1" v-if="item.sta">
				<view class="help_list_box container help_list_bottom" @click="details(item1)">
					<view>{{item1.title}}</view>
					<image src="/static/image/right.png"></image>
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
				search_name:'',
				search_list:[],
				searchShow:false
			}
		},
		onLoad() {
			this.listInterface()
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
				    url: this.api.helpList,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						search_name:this.search_name,
				    },
				    success: res => {
				        this.list = res
						this.list.map(item =>{
							item.sta = false
						})
				    }
				})
			},
			// 列表显示隐藏
			detail(eve,i) {
				if(this.list[i].sta == false) {
					this.list[i].sta = true
				} else {
					this.list[i].sta = false
				}
			},
			// 搜索框输入
			name(e) {
				console.log(e)
				if(e !=='') {
					this.http({
					    url: this.api.search_list,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							search_name:e,
					    },
					    success: res => {
							this.searchShow = true
					        this.search_list = res
					    }
					})
				}else {
					this.searchShow = false
				}
			},
			// 选择列表点击
			searchChange(eve,i){
				this.search_name = eve.title
				this.searchShow = false
			},
			// 搜索点击
			search() {
				this.listInterface()
			},
			// 详情点击
			details(eve){
				uni.navigateTo({
					url:'/pages/help_center/details/details?data='+encodeURIComponent(JSON.stringify(eve))
				})
			}
		}
	}
</script>

<style lang="scss">
.background {
	background: #F6F6F6;
}
.help_list_box {
	font-size: 32rpx;
	font-weight: 500;
	background: $color-f;
	color: $color-3;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 2rpx solid #EFEFEF;
	image {
		width: 20rpx;
		height: 10rpx;
	}
}
.help_list_bottom {
	font-size: 28rpx;
	font-weight: 400;
	color: $color-6;
	display: flex;
	align-items: center;
	justify-content: space-between;
	image {
		width: 30rpx;
		height: 18rpx;
	}
}
.search_list {
	z-index: 99;
	width: 556rpx;
	height: 400rpx;
	background: $color-f;
	box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(184, 184, 184, 0.5);
	border-radius: 4rpx;
	position: absolute;
	left: 0;
	top: 80rpx;
	overflow-y: scroll;
	.price_item {
		padding-left: 20rpx;
		height: 78rpx;
		line-height: 78rpx;
	}
}
</style>
