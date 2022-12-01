<template>
    <view class="fix-padding background" @click="hideIsShow">
        <view :class="preventEvent ? 'prevent': ''">
            <view class="container info mb-20">
                <view class="group">
                    <view class="title">选择仓库</view>
					<view class="outModal" @click="openModal('Warehouse')">
					    <uni-easyinput class="input" v-model="WarehouseName" placeholder="请选择仓库"
					        placeholder-style="color:#8D8D8D;" disabled>
					    </uni-easyinput>
					</view>
                </view>
				<view class="group">
				    <view class="title">客户名称</view>
				    <view class="outModal" @click="openModal('client')">
				        <uni-easyinput class="input" v-model="clientName" placeholder="请选择客户"
				            placeholder-style="color:#8D8D8D;" disabled>
				        </uni-easyinput>
				    </view>
				</view>
            </view>
           
            <view class="container good ">
                <view class="add_list" v-for="(item,index) in list" :key="item.id">
                    <view class="flex group">
						<view class="title title_name">商品名称</view>
                        <view class="outModal" @click="openModal('good',index)">
                            <uni-easyinput class="input" v-model="item.name" placeholder="请选择商品名称"
                                placeholder-style="color:#8D8D8D;" disabled>
                            </uni-easyinput>
                        </view>
						<view class="delete_box" @click="del(index)">
							<view class="delete"></view>
						</view>
                    </view>
					<view class="group">
					    <view class="title">商品图片</view>
					    <view class="remarkImage">
					        <image v-if="item.image" @click="previewImage(item.image)" class="image" :src="item.image"></image>
					        <image v-else class="image" src="/static/image/default.png"></image>
					    </view>
					</view>
					<view class="group">
					    <view class="title">商品编号</view>
					   <uni-easyinput type="text" class="input" v-model="item.serial_num" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">商品库存</view>
					   <uni-easyinput type="text" class="input" v-model="item.total_num" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled >
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">商品数量</view>
						<uni-easyinput v-if="item.total_num == 0" type="number" class="input" disabled  placeholder="请输入"
						    placeholder-style="color:#8D8D8D;" >
						</uni-easyinput>
					   <uni-easyinput v-else type="number" class="input" :value="item.num" @input="num($event,index)" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" >
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">商品单价</view>
					   <uni-easyinput type="number" class="input" v-model="item.price" @input="price($event,index)" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" suffixIcon="none">
					   </uni-easyinput>
					   <view class="chakan" @click.stop="chakanClick(item,index)">
						   <image src="/static/image/chakan.png"></image>
						   历史价
					   </view>
					   <view v-if="price_show" class="priceList">
							<view v-for="(i,e) in price_list" :key="e"  @click="priceChange(i,e)" class="price_item" >
								<view>{{i.price}}</view>
							</view>
					   </view>
					</view>
					<view class="group">
					    <view class="title">商品总价</view>
					   <uni-easyinput type="number" class="input" v-model="item.total_price" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<button class="btn-submit flex btn-submit_color mb-20" @click="add">
					    <image class="image" src="/static/image/plus.png"></image>
					    <view>再添加一个商品</view>
					</button>
					<view v-show="showWarehouse" class="modal">
					    <view class="modal-main">
					        <view class="modal-title">
					            <view class="text">仓库选择</view>
					            <image class="close" src="/static/image/modal-close.png" @click="closeModal('Warehouse')">
					            </image>
					        </view>
					        <view class="modal-body">
					            <view class="search flex">
					                <uni-easyinput class="input" v-model="textWarehouse" placeholder="请输入查询信息"></uni-easyinput>
					                <button class="btn-search" @click="searchWarehouse">搜索</button>
					            </view>
					            <view class="contact">
					                <view class="item_box" v-for="(item,i) in warehouse" :key="i" @click="selectWarehouse(i,index)">
					                    <view class="flex">
					                        <view class="title">仓库：</view>
					                        <view class="value">{{item.warehouse_name}}</view>
					                    </view>
					                </view>
					            </view>
					        </view>
					    </view>
					</view>
					<view v-show="showClient" class="modal">
					    <view class="modal-main">
					        <view class="modal-title">
					            <view class="text">客户选择</view>
					            <image class="close" src="/static/image/modal-close.png" @click="closeModal('client')">
					            </image>
					        </view>
					        <view class="modal-body">
					            <view class="search flex">
					                <uni-easyinput class="input" v-model="textClient" placeholder="请输入查询信息"></uni-easyinput>
					                <button class="btn-search" @click="searchClient">搜索</button>
					            </view>
					            <view class="contact">
					                <view class="item_box" v-for="(item,i) in clientList" :key="i" @click="selectClient(i,index)">
					                    <view class="flex">
					                        <view class="title">姓名：</view>
					                        <view class="value">{{item.nick_name}}</view>
					                    </view>
					                    <view class="flex">
					                        <view class="title">电话：</view>
					                        <view class="value">{{item.mobile}}</view>
					                    </view>
					                    <view class="flex">
					                        <view class="title">地址：</view>
					                        <view class="value ellipsis">{{item.addres}}</view>
					                    </view>
					                </view>
					            </view>
					        </view>
					    </view>
					</view>
					<view v-show="showGood" class="modal">
					    <view class="modal-main">
					        <view class="modal-title">
					            <view class="text">商品选择</view>
					            <image class="close" src="/static/image/modal-close.png" @click="closeModal('good')">
					            </image>
					        </view>
					        <view class="modal-body">
					            <view class="search flex">
					                <uni-easyinput class="input" v-model="textGood" placeholder="请输入商品信息"></uni-easyinput>
					                <button class="btn-search" @click="searchGood(index)">搜索</button>
					            </view>
					            <view class="content">
					                <view class="left">
					                    默认分类
					                </view>
					                <view class="right">
					                    <view class="item_box" v-for="(item,i) in goodList" :key="i">
					                        <image v-if="item.image" class="image" :src="item.image" mode="aspectFill"
					                            @click="previewGood(i)">
					                        </image>
					                        <image v-else class="image" src="/static/image/default.png">
					                        </image>
					                        <view class="name" @click="selectGood(i)">
					                            <!-- {{item.sort}} -->
												<view>
													{{item.name}}
												</view>
												<view>
													库存：{{item.stock}}
												</view>
					                        </view>
					                    </view>
					                </view>
					            </view>
					        </view>
					    </view>
					</view>
                </view>
                
            </view>
			
			<view class="container relative mt-20">
				<view class="group">
					<view class="title">出库备注</view>
					<uni-easyinput v-if="preventEvent" class="input" v-model="remark" placeholder="输入备注内容">
					</uni-easyinput>
					<uni-easyinput v-else class="input" v-model="remark" placeholder="输入备注内容">
					</uni-easyinput>
					<!-- <image class="image" src="/static/image/camera.png" @click="uploadImage"></image> -->
				</view>
			</view>
        </view>
        
        
        <view class="qrcode flex flex-column" @click="qrcode">
            <image class="image" src="/static/image/qrcode.png"></image>
            <view class="text">扫条码</view>
        </view>
		<uni-popup class="prop_bottom" ref="popups" type="bottom" :maskClick="false">
			<view class="prop_box container">
				<view class="prop_title">该商品库存为{{shop_num}}</view>
				<view class="group">
				    <view class="title">商品数量</view>
				   <uni-easyinput type="number" class="input" v-model="nums" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" >
				   </uni-easyinput>
				</view>
				<view class="prop_button">
					<button class="btn-submit btn-color" @click="popups_submit">完成</button>
					<button class="btn-submit" @click="popups_go">继续扫</button>
				</view>
			</view>
		</uni-popup>
        <view class="container fix-bottom">
            <button class="btn-submit" @click="submit">确定添加</button>
        </view>
	</view>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                uid: 0,
                warehouse: [],
                list: [
					{
						id: 0,
						name: "",
						image:'',
						price: 0.00,
						serial_num:'',
						num:0,
						total_num: 0,
						total_price: 0.00,
						cangku_id:'',
						kehu:'',
						kehu_id:'',
						clientId: 0,
						clientName: "",
					}
				],
                date: "",
                tel: "",
                remark: "",
                qIndex: 0,
                touchStartX: 0,
                touchStartY: 0,
                newClientId: 0,
                pIndex: 0,
                clientId: 0,
                clientName: "",
                showClient: false,
                clientList: [],
                textClient: "",
                showGood: false,
                goodList: [],
                textGood: "",
                itemIndex: 0,
                preventEvent: false,
                // cIndex: -1,
				price_list:[],
				price_show:false,
				shop_num:0,
				nums:'',
				popups_go_num:1,
				result:'',
				kehu_num : 1,
				showWarehouse:false,
				textWarehouse:'',
				WarehouseName:'',
				WarehouseId:'',
                // cycle: []
            }
        },
        mounted() {
            // this.date = this.getToday()
        },
        onLoad(option) {
            if (option.id) {
                this.newClientId = option.id
            }
            this.uid = this.common.get("uid")
			
			// 客户列表接口
            this.http({
                url: this.api.client,
                method: "POST",
                data: {
                    uid: this.uid
                },
                success: res => {
                    this.clientList = res
                    if (this.newClientId > 0) {
                        for (let i = 0; i < this.clientList.length; i++) {
                            if (this.clientList[i].id == this.newClientId) {
                                this.clientId = this.newClientId
                                this.clientName = this.clientList[i].nick_name
                                this.tel = this.clientList[i].mobile
                            }
                        }
                    }
                }
            })
        },
        methods: {
			// 历史价查看
			chakanClick(eve,i) {
				this.http({
				    url: this.api.export_price_list,
				    method: "POST",
				    data: {
				        uid: this.uid,
						goods_id:eve.id
				    },
				    success: res => {
				        this.price_list = res
						this.price_show = true
				    }
				})
				
			},
			// 历史价列表
			priceChange(eve,i) {
				this.list[this.itemIndex].price = eve.price
				this.list[this.itemIndex].total_price = (this.list[this.itemIndex].price * this.list[this.itemIndex].num).toFixed(2)
			},
			// 历史价列表关闭
			hideIsShow() {
				this.price_show = false
			},
			// 名称选择
            openModal(name, index) {
                this.preventEvent = true
                if (name == "client") {
                    this.showClient = true
					this.kehu_num = 1
                } else if (name == "good") {
					if(this.WarehouseId=='') {
						uni.showToast({
						    title: "请先选择仓库",
						    icon: "none"
						})
					} else {
						this.itemIndex = index
						this.showGood = true
						this.http({
						    url: this.api.goods_list,
						    method: "POST",
						    data: {
						        uid: this.uid,
								ware_id:this.WarehouseId,
						    },
						    success: res => {
						        this.goodList = res
						    }
						})
					}
                    
                } else if(name =="clientlist") {
					this.itemIndex = index
					this.showClient = true
					this.kehu_num = 2
				} else if(name =="Warehouse") {
					this.showWarehouse = true
					// 仓库列表接口
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
				}
            },
			// 弹窗关闭按钮
            closeModal(name) {
                this.preventEvent = false
                if (name == "client") {
                    this.showClient = false
                } else if (name == "good") {
                    this.showGood = false
                } else if (name == 'clientlist') {
					this.showClient = false
				} else if (name == 'Warehouse') {
					this.showWarehouse = false
				}
            },
			searchWarehouse() {
				// 仓库列表接口
				this.http({
				    url: this.api.warehouseList,
				    method: "POST",
				    data: {
				        uid: this.uid,
						search_name: this.textWarehouse
				    },
				    success: res => {
				        this.warehouse = res
				    }
				})
			},
			// 客户名称搜索
            searchClient() {
                this.http({
                    url: this.api.client,
                    method: "POST",
                    data: {
                        uid: this.uid,
                        search_name: this.textClient
                    },
                    success: res => {
                        this.clientList = res
                    }
                })
            },
			// 商品搜索
            searchGood(index) {
                this.http({
                    url: this.api.goods_list,
                    method: "POST",
                    data: {
                        uid: this.uid,
						ware_id:this.WarehouseId,
                        search_name: this.textGood
                    },
                    success: res => {
                        this.goodList = res
                    }
                })
            },
			selectWarehouse(i) {
				this.showWarehouse = false
				this.WarehouseId = this.warehouse[i].id
				this.WarehouseName = this.warehouse[i].warehouse_name
				this.list.map(item =>{
					item.cangku_id = this.WarehouseId
					item.cangku = this.WarehouseName
					if(item.id) {
						this.http({
						    url: this.api.goods_details,
						    method: "POST",
						    data: {
						        uid: this.uid,
						        goods_id: item.id,
								ware_id:this.WarehouseId,
								type:2
						    },
						    success: res => {
						        item.id = res.id
						        item.name = res.name
								item.image = res.image
						        item.price = res.price
								item.serial_num = res.serial_num
								item.total_num = res.total_num
								item.cangku_id = this.WarehouseId
								item.cangku = this.WarehouseName
								item.kehu_id = item.clientId
								item.kehu =  item.clientName
								item.num = 0
						    }
						})
					}
				})
			},
			// 客户选择点击
            selectClient(i) {
				if(this.kehu_num == 1) {
					this.clientId = this.clientList[i].id
					this.clientName = this.clientList[i].nick_name
					this.tel = this.clientList[i].mobile
					this.list.map(item =>{
						item.clientId = this.clientList[i].id
						item.clientName = this.clientList[i].nick_name
						item.kehu_id = this.clientList[i].id
						item.kehu = this.clientList[i].nick_name
						item.tel = this.clientList[i].mobile
					})
				} else {
					this.list[this.itemIndex].clientId = this.clientList[i].id
					this.list[this.itemIndex].clientName = this.clientList[i].nick_name
					this.list[this.itemIndex].kehu_id = this.clientList[i].id
					this.list[this.itemIndex].kehu = this.clientList[i].nick_name
					this.list[this.itemIndex].tel = this.clientList[i].mobile
				}
				this.showClient = false
                this.preventEvent = false
            },
			// 商品选择点击
            selectGood(i,e) {
                this.prevent = false
                this.showGood = false
                let gid = this.goodList[i].id
                let exist = this.isExist(gid)
                if (exist) {
                    uni.showToast({
                        title: "请勿重复添加商品",
                        icon: "none"
                    })
                    return
                }
                this.http({
                    url: this.api.goods_details,
                    method: "POST",
                    data: {
                        uid: this.uid,
                        goods_id: gid,
						ware_id:this.WarehouseId,
						type:2
                    },
                    success: res => {
                        this.list[this.itemIndex].id = gid
                        this.list[this.itemIndex].name = res.name
						this.list[this.itemIndex].image = res.image
                        this.list[this.itemIndex].price = res.price
						this.list[this.itemIndex].serial_num = res.serial_num
						this.list[this.itemIndex].total_num = res.total_num
						this.list[this.itemIndex].kehu =  this.clientName
						this.list[this.itemIndex].kehu_id = this.clientId
						this.list[this.itemIndex].cangku_id = this.WarehouseId
						this.list[this.itemIndex].cangku = this.WarehouseName
                    }
                })
            },

			// 添加商品图像预览
            previewImage(i) {
                wx.previewImage({
                    current: i,
                    urls: [i]
                })
            },
			// 弹框图像预览
            previewGood(i) {
                wx.previewImage({
                    current: this.goodList[i].image,
                    urls: [this.goodList[i].image]
                })
            },
            close() {
                this.preventEvent = false
            },
			
    //         },
			// 扫一扫
            qrcode() {
				let that = this
				if(that.WarehouseId == '') {
					uni.showToast({
					    title: "请先选择仓库",
					    icon: "none"
					})
				} else {
					// 允许从相机和相册扫码
					uni.scanCode({
						success: function (res) {
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
							that.http({
							    url: that.api.goods_details,
							    method: "POST",
							    data: {
							        uid: that.uid,
									ware_id:that.WarehouseId,
									bar_code:res.result,
									type:2
							    },
							    success: res => {
									that.result = res
									let exist = that.isExist(res.id)
									if (exist) {
									    uni.showToast({
									        title: "请勿重复添加商品",
									        icon: "none"
									    })
										that.$refs.popups.close();
										return
									}
									if(that.list[that.list.length-1].id == '') {
										that.$refs.popups.open();
										that.assignment()
									} else {
										that.$refs.popups.open();
										that.add()
										that.assignment()
									}
									
							    }
							})
						}
					});
				}
            },
			// 赋值
			assignment() {
				let that = this
				that.list[that.list.length-1].id = that.result.id
				that.list[that.list.length-1].name = that.result.name
				that.list[that.list.length-1].image = that.result.image
				that.list[that.list.length-1].price = that.result.price
				that.list[that.list.length-1].serial_num = that.result.serial_num
				that.shop_num = that.result.total_num
				that.list[that.list.length-1].total_num = that.result.total_num
				that.list[that.list.length-1].cangku_id = that.WarehouseId
				that.list[that.list.length-1].cangku = that.WarehouseName
				that.list[that.list.length-1].kehu_id = that.clientId
				that.list[that.list.length-1].kehu =  that.clientName
			},
			// 扫一扫完成按钮
			popups_submit() {
				this.list[this.list.length-1].num = this.nums
				this.list[this.list.length-1].total_price = (this.list[this.list.length-1].price * this.nums).toFixed(2)
				this.$refs.popups.close();
			},
			// 继续扫一扫按钮
			popups_go() {
				this.list[this.list.length-1].num = this.nums
				this.list[this.list.length-1].total_price = (this.list[this.list.length-1].price * this.nums).toFixed(2)
				this.popups_go_num = 2
				this.qrcode()
				this.nums = ''
			},
			// 添加商品按钮
            add() {
                let item = {
                    id: 0,
                    name: "",
                    image:'',
                    price: 0.00,
                    serial_num:'',
                    num:0,
                    total_num: 0,
                    total_price: 0.00,
					cangku_id:'',
					kehu:'',
					kehu_id:'',
					clientId: this.clientId,
					clientName: this.clientName,
                }
                this.list.push(item)
            },
			// 商品删除按钮
            del(index) {
				if (this.list.length == 1) {
					uni.showToast({
						title:'最少出库一个商品',
						icon:'none',
						duration: 2000
					})
				} else{
					this.list.splice(index, 1)
					// this.count()
				}
            },
			// 商品数量  总价
            num(e, i) {
                if (e == "") {
                    e = 0
                }
                this.list[i].num = e
				this.list[i].total_price = (this.list[i].price * this.list[i].num).toFixed(2)
            },
			// 商品单价
			price(e, i) {
				console.log('e',e)
			    if (e == "") {
			        e = 0
			    }
			    this.list[i].price = e
				this.list[i].total_price = (this.list[i].price * this.list[i].num).toFixed(2)
			},
            isExist(goodId) {
                let bool = false
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].id == goodId) {
                        bool = true
                    }
                }
                return bool
            },
            updatePriceArr() {
                let arr = []
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].id != 0) {
                        arr.push(this.list[i])
                    }
                }
                return arr
            },
			// 返回上一页
			previous() {
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.navigateBack({
				    success: function() {
				        beforePage.onLoad(); // 执行上一页的onLoad方法
				    }
				});
			},
			// 确定添加按钮点击
            submit() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.addExport,
							    method: "POST",
							    data: {
							        uid: this.uid,
									info:JSON.stringify(this.updatePriceArr(this.list)),
									remark:this.remark
							    },
							    success: res => {
									uni.showToast({
										title:'出库成功',
										icon:'none',
										duration: 2000
									})
									setTimeout(() =>{
										this.previous()
									},500) 
							    }
							})
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
				
            }
        }
    }
</script>

<style lang="scss">
.background {
	background: #F6F6F6;
}
.prop_bottom {
	.prop_box {
		z-index: 99;
		width: 100%;
		height: 368rpx;
		background: $color-f;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		.prop_title {
			font-size: 32rpx;
			text-align: center;
			color: $color-3;
			margin-bottom: 30rpx;
		}
		.prop_button {
			display: flex;
			margin-top: 30rpx;
			.btn-submit {
				width: 336rpx;
				height: 100rpx;
			}
			.btn-color {
				background: #34BCB5;
				margin-right: 20rpx;
			}
		}
	}
}
.picker {
    width: 556rpx;
    height: 80rpx;
    border-radius: 8rpx;
    border: 2rpx solid #E5E5E5;
    text-align: left;
    margin-left: 20rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
}

.relative {
	background: $color-f;
    .uni-easyinput__content {
        padding-right: 70rpx;
    }

    .image {
		position: absolute;
        top: 16rpx;
        right: 20rpx;
        width: 48rpx;
        height: 48rpx;
    }
}
.info {
	background: $color-f;
}

.good {
	margin-bottom: 20rpx;
    .add_list {
        margin-bottom: 20rpx;
		.title_name {
			width: 126rpx;
		}
		.group {
			position: relative;
			.chakan {
				z-index: 15;
				height: 50rpx;
				font-size: 24rpx;
				line-height: 50rpx;
				font-weight: 400;
				color: #F96164;
				display: flex;
				align-items: center;
				position: absolute;
				right: 20rpx;
				image {
					width: 28rpx;
					height: 22rpx;
					margin-right: 4rpx;
				}
			}
			.priceList {
				z-index: 99;
				width: 556rpx;
				background: $color-f;
				box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(184, 184, 184, 0.5);
				border-radius: 4rpx;
				position: absolute;
				right: 0;
				bottom: -80rpx;
				.price_item {
					padding-left: 20rpx;
					height: 78rpx;
					line-height: 78rpx;
				}
			}
		}
		
        .select {
			width: 590rpx;

            .input {
                height: 72rpx;
                line-height: 66rpx;
            }
        }
        .count {
            margin-top: 20rpx;
        
            .input {
                width: 210rpx;
                margin-right: 10rpx;
        
                &:last-child {
                    margin-right: 0;
                }
            }
        }    
		.delete_box {
			width: 44rpx;
			height: 50rpx;
			margin-left: 20rpx;
			display: flex;
			align-items: center;
			.delete {
			    width: 44rpx;
				height: 6rpx;
				background: #2578FF;
			}
		}
		
            
    }
	.btn-submit_color {
			background: #34BCB5;
		}
	    .btn-submit {
	        justify-content: center;
	        height: 80rpx;
	        line-height: 72rpx;
	
	        .image {
	            width: 30rpx;
	            height: 30rpx;
	            margin-right: 20rpx;
	        }
	    }
	}	

    .qrcode {
        position: fixed;
        top: 800rpx;
        right: 0;
        width: 136rpx;
        height: 100rpx;
        background: #2578FF;
        border-radius: 66rpx 0rpx 0rpx 66rpx;
        box-shadow: 0rpx 2rpx 16rpx 2rpx rgba(74, 74, 74, 0.24);
        z-index: 20;

        .image {
            width: 48rpx;
            height: 48rpx;
        }

        .text {
			margin-top: 4rpx;
			color: $color-f;
            font-size: 24rpx;
        }
    }

    .modal-body {
        .code {
            width: 360rpx;
            height: 360rpx;
            margin: 30rpx 0;
        }

        .slide {
            .image {
                width: 54rpx;
                height: 54rpx;
                margin-left: 20rpx;
            }
        }
    }

    .remarkImage {
        width: 558rpx;
        margin-left: 20rpx;
        .image {
            width: 160rpx;
            height: 160rpx;
			border: 2rpx solid #e7e7e7;
            border-radius: 10rpx;
        }
    }
</style>
