<template>
    <view class="background fix-padding">
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
                <uni-easyinput class="input" v-model="search_name" placeholder="请输入商品名称"></uni-easyinput>
                <button class="btn-search" @click="search">查询</button>
            </view>
        </view>
        <view class="container good">
            <view class="item" v-for="(item,index) in list" :key="index">
                <image v-if="item.image" class="image" :src="item.image"></image>
                <image v-else class="image" src="/static/image/default.png"></image>
                <view>
					<view class="row_right">{{item.warehouse_name}}</view>
                    <view class="row">
                        <view class="title">商品条码</view>
                        <view>{{item.bar_code}}</view>
                    </view>
                    <view class="row">
                        <view class="title">商品名称</view>
                        <view>{{item.goods_name}}</view>
                    </view>
                    <view class="row">
                        <view class="title">商品分类</view>
                        <view>{{item.cate_name}}</view>
                    </view>
                    <view class="row">
                        <view class="title">现有库存</view>
                        <view>{{item.num}}</view>
                    </view>
					<view class="row">
					    <view class="title">盘点库存</view>
						<uni-easyinput class="input" v-model="item.shuru_num" @input="shuru_num($event,index,item.num)" placeholder="请输入数量" ></uni-easyinput>
					    <view v-if="item.shuru_num && item.nums>=0" class="title ml-10 pandian">盘盈：{{item.nums}}</view>
						<view v-if="item.shuru_num && item.nums<0" class="title ml-10 pandian num">盘亏：{{item.nums}}</view>
					</view>
                </view>
            </view>
        </view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="subimit">盘点</button>
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
			        this.goodList = res
			    }
			})
			// 库存管理接口
            this.listInterface()
        },
		//上拉触底函数
		onReachBottom(){
			this.http({
			    url: this.api.take_stock,
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
			        }
			    }
			})
		},
        methods: {
			// 盘点输入
			shuru_num(eve,i,n) {
				this.list[i].nums = eve-n 
			},
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
				    url: this.api.take_stock,
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
			// 确认按钮
			subimit() {
				let info = []
				this.list.map(item => {
					if(item.shuru_num) {
						info.push(item)
					}
				})
				this.http({
				    url: this.api.new_affirm_check,
				    method: "POST",
				    data: {
				        uid: this.uid,
						info:JSON.stringify(info)
				    },
				    success: res => {
						this.listInterface()
						uni.showToast({
						    title: "盘点成功",
						    icon: "none"
						})
				    }
				})
			}
        },
    }
</script>

<style lang="scss">
    // .background {
    //     background: #F6F6F6;
    // }
	.btn-search {
		background: $color-b5;
	}

    
</style>
