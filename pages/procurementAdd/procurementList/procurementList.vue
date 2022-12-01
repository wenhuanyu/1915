<template>
	<view class="background">
		<!-- 新建信息按钮 -->
		<view class="container add">
			<navigator url="/pages/procurementAdd/procurementAdd/procurementAdd">
				<button class="flex" type="default">
					<image class="image" src="/static/image/add.png"></image>
				    <view>新建采购</view>
				</button>
			</navigator>
		</view>
		<!-- 搜索 -->
		<view class="container search">
			<view class="flex">
			    <uni-easyinput class="input" v-model="search_name" placeholder="请输入仓库名称"></uni-easyinput>
			    <button class="btn-search" @click="search">搜索</button>
			</view>
			<view class="flex mt-20">
				<view class="text">自定义查</view>
				<uni-datetime-picker class="date-picker" ref="formDate" v-model="start_time" type="date" placeholder="开始时间"/>
				至
				<uni-datetime-picker class="date-picker" ref="formDate" v-model="end_time" type="date" placeholder="结束时间"/>
				<button class="btn-search btn-color" @click="search">查询</button>
			</view>
		</view>
		<!-- 列表 -->
		<view class="container list">
		   <view class="item" v-for="(item,index) in list" :key="item.id">
		       <view class="big ellipsis">
		           采购单号{{item.no}}
		       </view>
		       <view class="flex top .mb-10">
		           <view class="title grey">采购数量</view>
		           <view class="value">{{item.total_count}}</view>
		       </view>
			   <view class="flex .mb-10">
			       <view class="title grey">供应商</view>
			       <view class="value">{{item.apply_name}}</view>
			   </view>
			   <view class="flex .mb-10">
			       <view class="title grey">采购仓库</view>
			       <view class="value">{{item.ware_name}}</view>
			   </view>
			   <view class="flex .mb-10">
			       <view class="title grey">采购员</view>
			       <view class="value">{{item.business_people}}</view>
			   </view>
			   <view class="flex .mb-10"  v-if="item.check_user">
			       <view class="title grey">审核员</view>
			       <view class="value">{{item.check_user}}</view>
			   </view>
		       <view class="flex .mb-10">
		           <view class="title grey">时间</view>
		           <view class="value">{{item.create_time}}</view>
		       </view>
		       <view class="flex .mb-10 last">
		           <view class="title grey">备注</view>
		           <view class="value">{{item.remark}}</view>
		       </view>
		       <view class="arrow flex flex-column" @click="detail(item.id)">
		           <view>详情</view>
		       </view>
		   	<view class="rightbox rightboxBack" v-if="item.check_status == 0">
		   		{{item.check_status_text}}
		   	</view>
		   	<view class="rightbox jujueBack" v-if="item.check_status == 1">
		   		{{item.check_status_text}}
		   	</view>
		   	<view class="rightbox shibaieBack" v-if="item.check_status == 2">
		   		{{item.check_status_text}}
		   	</view>
		   	<view class="rightbox dairukuBack" v-if="item.check_status == 3">
		   		{{item.check_status_text}}
		   	</view>
		   	<view class="rightbox shenheBack" v-if="item.check_status == 4">
		   		{{item.check_status_text}}
		   	</view>
		   </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search_name:'',
				start_time:'',
				end_time:'',
				list:[],
				page:0,
			}
		},
		onShow() {
			this.page = 0
			// 出库记录接口
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			// 出库记录接口
			this.http({
			    url: this.api.warehouse_purchase_list,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
			        search_name: this.search_name,
					start_time:this.start_time,
					end_time:this.end_time,
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
				    url: this.api.warehouse_purchase_list,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        search_name: this.search_name,
						start_time:this.start_time,
						end_time:this.end_time,
						page:this.page
				    },
				    success: res => {
				        this.page+=1
				        this.list = res.list
				    }
				})
			},
			// 搜索 查询按钮点击
			search() {
				this.listInterface()
			},
			// 详情按钮点击
			detail(eve){
				uni.navigateTo({
					url:'/pages/procurementAdd/details/details?data='+encodeURIComponent(JSON.stringify(eve))
				})
			}
			
		}
	}
</script>

<style lang="scss">
.modal_bottom {
	z-index: 999;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	.modal-main {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 100;
		>view{
			width: 100%;
			box-shadow: 0px -13rpx 34rpx 0px rgba(0, 0, 0, 0.12);
			border-radius: 20rpx 20rpx 0px 0px;
			background: $color-f;
			position: absolute;
			bottom: 0;
			left: 0;
		}
		.date-picker {
			width: 550rpx!important;
			margin-left: 20rpx;
		}
	}
}
.list .item .title {
	width: 100rpx;
	text-align-last: justify;
}

.btn-color {
	width: 120rpx!important;
	height: 64rpx;
	line-height: 64rpx;
	background: $color-b5;
}
.search .uni-date-editor--x .uni-date__icon-clear {
	top: -4rpx;
}
.uni-date-single {
	padding: 0!important;
	height: 64rpx;
}
.date-picker {
	width: 42%!important;
}
.uniui-calendar {
	display: none;
}
</style>
