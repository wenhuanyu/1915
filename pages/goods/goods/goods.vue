<template>
	<view class="background fix-padding">
		<!-- 新建信息按钮 -->
		<view class="container add">
			<navigator url="/pages/goods/add/add">
				<button class="flex" type="default">
					<image class="image" src="/static/image/add.png"></image>
				    <view>新建商品</view>
				</button>
			</navigator>
		</view>
		<!-- 搜索 -->
		<view class="container search">
			<view class="flex">
				<uni-easyinput class="input picker_mr" v-model="search_name" placeholder="请输入商品名称"></uni-easyinput>
				<picker class="picker picker_mr" @change="changegoods" :value="gIndex" :range="goodList" :range-key="'name'">
				    <view v-if="gIndex == -1" class="uni-input">商品分类</view>
				    <view v-else class="uni-input">{{goodList[gIndex].name}}</view>
				    <image class="image" src="/static/image/picker.png"></image>
				</picker>
			    <button class="btn-search" @click="search">搜索</button>
			</view>
			
		</view>
		<!-- 列表 -->
		<view class="container list">
		    <checkbox-group name="check" @change="changeCheck" class="check">
				<view class="item flex" v-for="(item,index) in list" :key="item.id" @click="detail(item.id)">
				    <image v-if="item.image" class="image" :src="item.image"></image>
				    <image v-else class="image" src="/static/image/default.png"></image>
					<view>
						<view class="big">
						    {{item.name}}
						</view>
						<view class="flex top mb-10">
						    <view class="title grey">商品类别</view>
						    <view class="value">{{item.cate_name}}</view>
						</view>
						<view class="flex mb-10">
							<view class="flex mr-20">
								<view class="title grey">商品进价</view>
								<view class="value value_len">￥{{item.cost_price}}</view>
							</view>
							<view class="flex ">
								<view class="title grey">建议零售</view>
							    <view class="value value_len">￥{{item.price}}</view>
							</view>
						</view>
						<view class="flex mb-10">
						    <view class="title grey">商品单位</view>
						    <view class="value">{{item.unit_name}}</view>
						</view>
						<view class="flex mb-10 last">
						    <view class="title grey">商品备注</view>
						    <view class="value">{{item.remark}}</view>
						</view>
						<view class="checkbox"  @click.stop>
							<checkbox class="checkClick round" :value="item.id" :checked="checkedArr.includes(String(item.id))"></checkbox>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view class="container fix-bottom flex_between">
			<checkbox-group name="allCheck" @change="changeAll">
				<checkbox class="checkClick round" :value="allCheck.value" :checked="allCheck.checked"/>
				<text class="cl fs28">{{allCheck.name}}</text>
				<text class="cl fs28 ml-20">共{{checkedArr.length}}条</text>
			</checkbox-group>
		    <button class="btn-search" @click="del">删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search_name:'',
				list:[],
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				checkedArr:[], //复选框选中的值
				page:0,
				goodList:[],
				cate_id:'',
				gIndex: -1,
			}
		},
		onLoad() {
			// 接口
			this.listInterface()
			// 商品分类接口
			this.http({
			    url: this.api.shopType,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid")
			    },
			    success: res => {
			        this.goodList = res
			    }
			})
		},
		//上拉触底函数
		onReachBottom(){
			// 列表接口
			this.http({
			    url: this.api.ShopList,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
			        search_name: this.search_name,
					cate_id:this.cate_id,
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
				    url: this.api.ShopList,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        search_name: this.search_name,
						cate_id:this.cate_id,
						page:this.page
				    },
				    success: res => {
				        this.page+=1
				        this.list = res.list
				    }
				})
			},
			// 商品分类点击
			changegoods(e) {
				this.gIndex = e.target.value
			},
			// 搜索 查询按钮点击
			search() {
				if (this.gIndex == -1) {
				    this.cate_id = ''
				} else {
				    this.cate_id = this.goodList[this.gIndex].id
				}
				this.listInterface()
			},
			// 多选复选框改变事件
			changeCheck(e){
			    this.checkedArr = e.detail.value;
			     // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
			    if(this.checkedArr.length>0 && this.checkedArr.length==this.list.length){
			        this.allCheck.checked=true;
			    }else{
			        this.allCheck.checked=false;
			    }
			},
			// 全选事件
			changeAll(e){
			    let chooseItem = e.detail.value;
			    // 全选
			    if(chooseItem[0]=='all'){
			        this.allCheck.checked=true;
			        for(let item of this.list){
			            let itemVal=String(item.id);
			            if(!this.checkedArr.includes(itemVal)){
			                this.checkedArr.push(itemVal);
						}
			        }
			    }else{
			        // 取消全选
			        this.allCheck.checked=false;
			        this.checkedArr=[];
			    }
			},
			// 删除按钮
			del(){
				if(this.checkedArr.length == 0) {
					uni.showToast({
						title: '请选择要删除的商品',
						icon:'none',
						duration: 2000
					});
					return;
				}
				uni.showModal({
					title: '提示',
					content: '确定要删除选择的商品吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.deleteShop,
							    method: "POST",
							    data: {
							        uid: this.common.get("uid"),
							        goods_id:this.checkedArr
							    },
							    success: res => {
							        this.listInterface()
									this.checkedArr=[];
									this.allCheck.checked=false;
							    }
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 详情按钮点击
			detail(eve){
				uni.navigateTo({
					url:'/pages/goods/add/add?data='+encodeURIComponent(JSON.stringify(eve))
				})
			}
			
		}
	}
</script>

<style lang="scss">
.search {
	.input {
		width: 272rpx;
	}
	.picker {
		width: 258rpx;
	}
	.btn-search {
		background: #34BCB5;
	}
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
.list {
	position: relative;
    background-color: $color-f;
	.flex {
		align-items: initial;
	}
	.checkbox {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}
    .item {
        position: relative;
        width: 690rpx;
		background: $color-f;
        box-shadow: 0rpx 2rpx 16rpx 2rpx rgba(179, 175, 175, 0.25);
        border-radius: 8rpx;
        margin-bottom: 20rpx;
        padding: 30rpx 30rpx 30rpx 20rpx;
        box-sizing: border-box;
        &:last-child {
            margin-bottom: 0;
        }
		.image {
		    width: 160rpx;
		    height: 160rpx;
		    margin-right: 20rpx;
		    margin-top: 12rpx;
			border: 2rpx solid #F3F1F1;
		}
        .title {
            color: $color-7;
			font-size: 24rpx;
            font-weight: normal;
        }
		.value {
			width: 330rpx;
			font-size: 24rpx;
		}
		.value_len {
			width: 100rpx;
		}
        .big {
            font-size: 32rpx;
			font-weight: 500;
            width: 380rpx;
            margin-bottom: 10rpx;
        }

        .grey {
            color: #9FA1A3;
            margin-right: 10rpx;
        }
    }
}
</style>
