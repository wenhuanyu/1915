<template>
    <view class="background">
        <view class="total"></view>
        <view class="fix-top flex">
            <view class="stock flex flex-column mr-20">
                <view class="text">当日出库数量</view>
                <view class="number">{{that_day_num}}</view>
            </view>
            <view class="good flex flex-column mr-20">
                <view class="text">当月出库数量</view>
                <view class="number">{{that_yue_num}}</view>
            </view>
			<view class="good flex flex-column">
			    <view class="text">当月仓库金额</view>
			    <view class="number">￥{{that_yue_price}}</view>
			</view>
        </view>
        <view class="container search">
            <view class="flex">
				<uni-easyinput class="input" v-model="search_name" placeholder="搜索员工姓名"></uni-easyinput>
				<button class="btn-search" @click="search">搜索</button>
			</view>
        </view>
		<view class="good">
			<view class="item_top">
				<view class="item_top_date">
					<picker class="date-picker" mode="date" fields="month" :value="time" start="2021-01" end="2050-09"
						@change="DateChange($event)">
						<view class="date_text">
							{{time}}
							<image class="image ml-10" src="/static/image/picker.png"></image>
						</view>
					</picker>
				</view>
				<view class="flex item_top_text">
					<view class="flex mr-60 mt-20">
						<view class="item_color mr-10">出库总数</view>
						<view>{{count_num}}</view>
					</view>
					<view class="flex mt-20">
						<view class="item_color mr-10">总金额</view>
						<view>￥{{count_price}}</view>
					</view>
				</view>
			</view>
			<view class="item_lirun_box">
				<view class="item_bottom">
					<view class="item_lirun_box" v-for="(item,index) in list" :key="index">
						<image class="mr-20" :src="item.avatar"></image>
						<view class="item_name mr-60">{{item.name}}</view>
						<view class="mr-60">
							<view class="item_title mb-10">出库数量</view>
							<view class="item_value">{{item.num}}</view>
						</view>
						<view>
							<view class="item_title mb-10">总金额</view>
							<view class="item_value">￥{{item.total_money}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                uid: 0,
				list:[],
                search_name: "",
                that_day_num: 0,
                that_yue_num: 0,
				that_yue_price:0,
				count_num:0,
				count_price:0,
				time:'',
				page:0,
            }
        },
		//上拉触底函数
		onReachBottom(){
			// 列表接口
			this.http({
			    url: this.api.results_index,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
			        search_name: this.search_name,
					time:this.time,
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
						this.that_day_num = res.that_day_num
						this.that_yue_num =  res.that_yue_num
						this.that_yue_price = res.that_yue_price
						this.count_num = res.count_num
						this.count_price = res.count_price
					}
			    }, 
			})
		},
		
        onLoad() {
            this.uid = this.common.get("uid")
			// 列表接口
			this.time = this.getDate()
            this.listInterface()
        },
        methods: {
			// 选择日期
			DateChange(eve) {
				this.time =  eve.detail.value
				this.listInterface()
			},
			// 当前日期
			getDate(type) {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				month = month > 9 ? month : '0' + month;
				return `${year}-${month}`;
			},
			// 库存管理接口
			listInterface() {
				this.page = 0
				this.http({
				    url: this.api.results_index,
				    method: "POST",
				    data: {
				        uid: this.uid,
						time:this.time,
						search_name:this.search_name,
						page:this.page
				    },
				    success: res => {
				        this.list = res.list
						this.that_day_num = res.that_day_num
						this.that_yue_num =  res.that_yue_num
						this.that_yue_price = res.that_yue_price
						this.count_num = res.count_num
						this.count_price = res.count_price
				    }
				})
			},
			// 查询按钮点击
            search() {
				this.listInterface()
            },
        },
    }
</script>

<style lang="scss">
    .background {
        background: #F6F6F6;
    }
    .total {
        width: 750rpx;
        height: 170rpx;
        background: $color-main;
    }

    .fix-top {
        position: absolute;
        width: 750rpx;
        height: 270rpx;
        padding: 30rpx;
        box-sizing: border-box;
        top: 0;

        .flex {
            width: 220rpx;
            height: 160rpx;
            background: $color-f;
            box-shadow: 0rpx 2rpx 16rpx 2rpx rgba(179, 175, 175, 0.12);
            border-radius: 8rpx;

            .text {
                font-size: 24rpx;
                color: $color-9;
            }

            .number {
                font-size: 28rpx;
                color: #2578FF;
                font-weight: bold;
                margin-top: 10rpx;
            }
        }
    }

    .search {
        margin-top: 48rpx;
		.date-picker {
			width: 42%!important;
			.date_text {
				width: 198rpx;
				height: 64rpx;
				line-height: 64rpx;
				text-align: center;
				background: #FAFBFC;
				border-radius: 4rpx;
				border: 2rpx solid #EBEBEB;
				margin-left: 14rpx;
				font-size: 24rpx;
				color: #999999;
			}
		}
		.uni-date-single {
			padding: 0!important;
			height: 64rpx;
		}
		.uniui-calendar {
			display: none;
		}
		.uni-date-editor--x .uni-date__icon-clear {
			top: -4rpx;
		}
		.btn-color {
			width: 120rpx!important;
			height: 64rpx;
			line-height: 64rpx;
			background: $color-b5;
		}
    }
.item_top {
		border-bottom: 2rpx solid #EFEFEF;
		padding: 30rpx;
		.item_top_date {
			font-size: 36rpx;
			font-weight: bold;
			color: $color-3;
		}
		.item_top_text {
			font-size: 24rpx;
			font-weight: 500;
			color: $color-3;
		}
		.item_color{
			color: #999999;
		}
		.image {
			width: 20rpx;
			height: 18rpx;
		}
	}
.item_lirun_box {
	.item_bottom {
		
		.item_lirun_box {
			padding: 30rpx;
			border-bottom: 2rpx solid #EFEFEF;
			display: flex;
			align-items: center;
			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
			.item_name {
				width: 120rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #3D4154;
			}
			.item_title {
				font-size: 24rpx;
				font-weight: 400;
				color: $color-9;
			}
			.item_value {
				font-size: 32rpx;
				font-weight: 500;
				color: #2578FF;
				width: 180rpx;
			}
		}
	}
}
</style>
