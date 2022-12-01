<template>
    <view class="background">
        <view class="total"></view>
        <view class="fix-top flex">
            <view class="stock flex flex-column mr-20">
                <view class="text">总业绩</view>
                <view class="number">￥{{total_price}}</view>
            </view>
            <view class="good flex flex-column">
                <view class="text">总利润</view>
                <view class="number">￥{{staff_profit}}</view>
            </view>
        </view>
        <view class="container search">
            <view class="flex">
				<uni-easyinput class="input" v-model="search_name" placeholder="搜索员工姓名"></uni-easyinput>
			</view>
            <view class="flex mt-20">
                <view class="text">自定义查</view>
				<picker class="date-picker" mode="date" fields="month" :value="start_time" start="2021-01" end="2050-09" 
					@change="DateChange('start',$event)">
					<view class="date_text">
						{{start_time}}
					</view>
				</picker>
                至
				<picker class="date-picker" mode="date" fields="month" :value="end_time" start="2021-01" end="2050-09"
					@change="DateChange('end',$event)">
					<view class="date_text">
						{{end_time}}
					</view>
				</picker>
                <button class="btn-search btn-color" @click="search">查询</button>
            </view>
        </view>
		<view class="good">
			<view class="item_lirun_box" v-for="(item,index) in list" :key="index">
				<view class="item_top">
					<view class="item_top_date">{{item.date}}</view>
					<view class="flex item_top_text">
						<view class="flex mr-60 mt-20" v-if="show">
							<view class="item_color mr-10">总业绩</view>
							<view>￥{{item.total_prices}}</view>
						</view>
						<view class="flex mt-20" v-if="show">
							<view class="item_color mr-10">总利润</view>
							<view>￥{{item.total_profits}}</view>
						</view>
					</view>
				</view>
				<view class="item_bottom">
					<view class="item_lirun_box" v-for="(item,index) in item.list" :key="index">
						<image class="mr-20" :src="item.avatar"></image>
						<view class="item_name mr-60">{{item.name}}</view>
						<view class="mr-60">
							<view class="item_title">业绩</view>
							<view class="item_value">￥{{item.price}}</view>
						</view>
						<view>
							<view class="item_title">利润</view>
							<view class="item_value">￥{{item.staff_profits}}</view>
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
                total_price: 0,
                staff_profit: 0,
				show:true,
				start_time:'开始时间',
				end_time:'结束时间'
            }
        },
        onLoad() {
            this.uid = this.common.get("uid")
			// 列表接口
            this.http({
                url: this.api.profit,
                method: "POST",
                data: {
                    uid: this.uid,
					start_time:this.getDate(),
					end_time:this.getDate()
                },
                success: res => {
                    this.list = res.last
					this.total_price = res.total_price
					this.staff_profit =  res.staff_profit
                }
            })
        },
        methods: {
			// 选择日期
			DateChange(i,eve) {
				if(i == 'start') {
					this.start_time =  eve.detail.value
				} else {
					this.end_time =  eve.detail.value
				}
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
				if(this.search_name !== '') {
					this.show = false
				} else {
					this.show = true
				}
				this.http({
				    url: this.api.profit,
				    method: "POST",
				    data: {
				        uid: this.uid,
						start_time:this.start_time=='开始时间'?this.getDate():this.start_time,
						end_time:this.end_time=='结束时间'?this.getDate():this.end_time,
						nick_name:this.search_name
				    },
				    success: res => {
				        this.list = res.last
						this.total_price = res.total_price
						this.staff_profit =  res.staff_profit
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
            width: 346rpx;
            height: 160rpx;
            background: $color-f;
            box-shadow: 0rpx 2rpx 16rpx 2rpx rgba(179, 175, 175, 0.12);
            border-radius: 8rpx;

            .text {
                font-size: 24rpx;
                color: $color-9;
            }

            .number {
                font-size: 40rpx;
                color: $color-3;
                font-weight: bold;
                margin-top: 10rpx;
            }
        }
    }

    .search {
        margin-top: 48rpx;
		.input {
			width: 100%;
			margin-right: 0;
		}
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

.item_lirun_box {
	.item_top {
		border-bottom: 2rpx solid #EFEFEF;
		padding: 30rpx;
		.item_top_date {
			font-size: 28rpx;
			font-weight: 400;
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
	}
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
