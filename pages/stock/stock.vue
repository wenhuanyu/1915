<template>
    <view class="background fix-padding">
        <view class="total"></view>
        <view class="fix-top flex">
            <view class="stock flex flex-column mr-20">
                <view class="text">今日入库数量</view>
                <view class="number">{{num.today_r_num}}</view>
            </view>
            <view class="good flex flex-column mr-20">
                <view class="text">今日出库数量</view>
                <view class="number">{{num.today_c_num}}</view>
            </view>
			<view class="good flex flex-column">
			    <view class="text">库存总量</view>
			    <view class="number">{{num.today_kc_num}}</view>
			</view>
        </view>
        <view class="container search">
            <view class="flex">
				<picker class="picker" @change="changeWarehouse" :value="wIndex" :range="warehouse" :range-key="'warehouse_name'">
				    <view v-if="wIndex == -1" class="uni-input">所有库存</view>
				    <view v-else class="uni-input">{{warehouse[wIndex].warehouse_name}}</view>
				    <image class="image" src="/static/image/picker.png"></image>
				</picker>
				<picker class="picker picker_ml" @change="changegoods" :value="gIndex" :range="goodList" :range-key="'name'">
				    <view v-if="gIndex == -1" class="uni-input">商品分类</view>
				    <view v-else class="uni-input">{{goodList[gIndex].name}}</view>
				    <image class="image" src="/static/image/picker.png"></image>
				</picker>
			</view>
            <view class="flex mt-20">
                <uni-easyinput class="input" v-model="search_name" placeholder="请输入仓库名称"></uni-easyinput>
                <button class="btn-search" @click="search">查询</button>
            </view>
        </view>
        <view class="container good">
			<view class="flex list_title">
				<view class="row">
					<view class="title">库存总数</view>
					<view class="value">{{stockNumber}}</view>
				</view>
				<view class="row ">
					<view class="title row_line">商品总数</view>
					<view class="value">{{goodNumber}}</view>
				</view>
			</view>
            <view class="item" v-for="(item,index) in list" :key="index">
                <image v-if="item.image" class="image" :src="item.image"></image>
                <image v-else class="image" src="/static/image/default.png"></image>
                <view>
					<view class="row_right">{{item.warehouse_name}}</view>
                    <view class="row">
                        <view class="title">商品条码</view>
                        <view class="value">{{item.bar_code}}</view>
                    </view>
                    <view class="row">
                        <view class="title">商品名称</view>
                        <view class="value">{{item.goods_name}}</view>
                    </view>
                    <view class="row">
                        <view class="title">商品分类</view>
                        <view class="value">{{item.cate_name}}</view>
                    </view>
                    <view class="row">
                        <view class="title num">现有库存</view>
                        <view class="value num">{{item.num}}</view>
                    </view>
                </view>
            </view>
        </view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="navigateBack">返回</button>
		</view>
    </view>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                uid: 0,
                warehouse: [],
				goodList:[],
                wIndex: -1,
				gIndex: -1,
                list: [],
                warehouse_id: 0,
				cate_id:'',
                search_name: "",
                stockNumber: 0,
                goodNumber: 0,
				num:{},
				page:0,
            }
        },
        onLoad() {
            this.uid = this.common.get("uid")
			// 库存列表接口
            this.http({
                url: this.api.warehouseList,
                method: "POST",
                data: {
                    uid: this.uid
                },
                success: res => {
                    this.warehouse = res
                }
            })
			// 商品分类接口
			this.http({
			    url: this.api.shopType,
			    method: "POST",
			    data: {
			        uid: this.uid
			    },
			    success: res => {
					console.log('res',res)
			        this.goodList = res
			    }
			})
			// 库存管理接口
            this.listInterface()
			// 首页数据接口   今日入库出库 库存总量
			this.http({
			    url: this.api.infoData,
			    method: "POST",
			    data: {
			        uid: this.uid,
			    },
			    success: res => {
			        this.num = res
			    }
			})
        },
		//上拉触底函数
		onReachBottom(){
			this.http({
			    url: this.api.stock,
			    method: "POST",
			    data: {
			        uid: this.uid,
			        warehouse_id: this.warehouse_id,
					cate_id:this.cate_id,
			        goods_name: this.search_name,
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
						this.stockNumber = res.stock_count
						this.goodNumber = res.total
			        }
			    }
			})
		},
        methods: {
			// 库存列表点击
            changeWarehouse(e) {
                this.wIndex = e.target.value
            },
			// 商品分类点击
			changegoods(e) {
				this.gIndex = e.target.value
			},
			// 库存管理接口
			listInterface() {
				this.page = 0
				this.http({
				    url: this.api.stock,
				    method: "POST",
				    data: {
				        uid: this.uid,
				        warehouse_id: this.warehouse_id,
						cate_id:this.cate_id,
				        goods_name: this.search_name,
						page:this.page
				    },
				    success: res => {
						this.page+=1
				        this.list = res.list
				        this.stockNumber = res.stock_count
				        this.goodNumber = res.total
				    }
				})
			},
			// 查询按钮点击
            search() {
                if (this.wIndex == -1) {
                    this.warehouse_id = 0
                } else {
                    this.warehouse_id = this.warehouse[this.wIndex].id
                }
				if (this.gIndex == -1) {
				    this.cate_id = ''
				} else {
				    this.cate_id = this.goodList[this.gIndex].id
				}
				this.listInterface()
            },
			// 返回
			navigateBack() {
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
        },
    }
</script>

<style lang="scss">
    .background {
        background: #F6F6F6;
    }
	.btn-search {
		background: $color-b5;
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
                font-size: 40rpx;
                color: $color-3;
                font-weight: bold;
                margin-top: 10rpx;
            }
        }
    }

    .search {
        margin-top: 48rpx;
		.picker {
			.uni-input {
				text-align: left;
				width: 300rpx;
			}
		}
    }

    
</style>
