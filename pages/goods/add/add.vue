<template>
	<view class="background fix-padding">
		<view class="top" @click="qrcode">
			<image src="/static/image/sao.png"></image>
			请扫描商品编码
		</view>
		<view class="good">
			<view class="group">
			    <view class="title">商品名称*</view>
			    <uni-easyinput class="input" v-model="form.name" placeholder="请输入商品名称" ></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">商品类别*</view>
			    <picker class="picker picker_mr" @change="changegoods" :value="gIndex" :range="goodList" :range-key="'name'">
			        <view v-if="gIndex == -1" class="uni-input">请选择商品分类</view>
			        <view v-else class="uni-input">{{cate_name}}</view>
			        <image class="image" src="/static/image/picker.png"></image>
			    </picker>
			</view>
			<view class="group">
			    <view class="title">商品单位*</view>
			    <picker class="picker picker_mr" @change="changeunit" :value="uIndex" :range="shop_unit_list" :range-key="'unit_name'">
			        <view v-if="uIndex == -1" class="uni-input">请选择商品单位</view>
			        <view v-else class="uni-input">{{unit_name}}</view>
			        <image class="image" src="/static/image/picker.png"></image>
			    </picker>
			</view>
			<view class="group">
			    <view class="title">商品条码</view>
			    <uni-easyinput class="input" v-model="form.bar_code" placeholder="请输入商品条码"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">商品编号</view>
			    <uni-easyinput class="input" v-model="form.serial_num" placeholder="请输入商品编号"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">商品型号</view>
			    <uni-easyinput class="input" v-model="form.marque" placeholder="请输入商品型号"></uni-easyinput>
			</view>
			<view class="group content">
				<view class="title">商品图片</view>
				<view class="remarkImage flex">
					<view class="item_image" @click="uploadImage">
						<image class="image" src="/static/image/paizhao.png"></image>
					</view>
					<view class="item_image" v-if="form.image==''">
						<image class="image" src="/static/image/wu.png"></image>
					</view>
					<view class="item_image" v-else>
						<image class="image" :src="form.image" @click="previewImage(index)"></image>
						<image class="delete" src="/static/image/delete.png" @click="deleteImage"></image>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">商品进价</view>
			    <uni-easyinput class="input" v-model="form.cost_price" placeholder="请输入商品进价"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">建议零售</view>
			    <uni-easyinput class="input" v-model="form.price" placeholder="请输入建议零售"></uni-easyinput>
			</view>
			
			<view class="group">
			    <view class="title">商品备注</view>
			    <uni-easyinput class="input" v-model="form.remark" placeholder="请输入备注"></uni-easyinput>
			</view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">{{button_text}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					name:'',//名称
					cate_id:'',//商品分类
					unit_id:'',//商品单位
					bar_code:'',//商品条码
					serial_num:'',//商品编号
					marque:'',//商品型号
					cost_price:'',//商品进价
					price:'',//商品售价
					remark:'',//备注
					image:'',//商品图片
				},
				data:'',
				edit:'',
				button_text:'',
				remarkImage: '',
				goodList:[],
				gIndex: -1,
				shop_unit_list:[],
				uIndex:-1,
				cate_name:'',
				unit_name:''
			}
		},
		onLoad(option) {
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
			// 商品单位接口
			this.http({
			    url: this.api.shop_unit,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid")
			    },
			    success: res => {
			        this.shop_unit_list = res
			    }
			})
			this.edit = option
			if(option.data) {
				uni.setNavigationBarTitle({
				    title: '编辑商品'
				});
				this.button_text ="确定修改"
				this.data = JSON.parse(decodeURIComponent(option.data))
				this.http({
					url:this.api.editShop,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						type:1,
						goods_id:this.data
					},
					success:res=>{
						this.form = res[0]
						this.unit_name = this.form.unit_name
						if(this.unit_name =='') {
							this.unit_name = '请选择商品单位'
						}
						this.cate_name = this.form.cate_name
						if(this.cate_name =='') {
							this.cate_name = '请选择商品分类'
						}
						this.gIndex = 0
						this.uIndex = 0
					}
				})
			} else {
				this.button_text ="确定添加"
			}
		},
		methods: {
			// 商品分类点击
			changegoods(e) {
				this.gIndex = e.target.value
				this.form.cate_id = this.goodList[this.gIndex].name
				this.cate_name = this.goodList[this.gIndex].name
				console.log('e',e)
			},
			// 商品单位点击
			changeunit(e) {
				this.uIndex = e.target.value
				this.form.unit_id = this.shop_unit_list[this.uIndex].unit_name
				this.unit_name = this.shop_unit_list[this.uIndex].unit_name
			},
			// 添加图片
			uploadImage() {
				uni.chooseImage({
					count: 1,
					success: res => {
						let filePath = res.tempFilePaths[0];
						uni.uploadFile({
						    url: this.common.baseUrl + this.api.upload,
						    filePath: filePath,
						    name: "file",
						    success: res => {
						        let data = JSON.parse(res.data);
						        if (data.code == 1) {
						            this.form.image=data.data.url
								} else {
						            uni.showToast({
						                title: "上传失败",
						                icon: "none"
						            })
						        }
						    },
						    fail: res => {
						        uni.showToast({
						            title: "上传失败," + res,
						            icon: "none"
						        })
						    }
						})
					}
				})
			},
			// 图片放大
			previewImage(i) {
				let imgsArray = [];
				imgsArray[0] = this.form.image;
				wx.previewImage({
					current: 0,
					urls: imgsArray,
				})
			},
			// 删除图片
			deleteImage(i) {
				this.form.image = ''
			},
			qrcode() {
				let that = this
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function (res) {
						that.form.bar_code = res.result
					}
				});
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
			// 添加/编辑按钮点击
			add() {
				this.form.unit_id = this.unit_name
				this.form.cate_id = this.cate_name
				if(this.edit.data) {
					// 编辑
					this.http({
						url:this.api.editShop,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							type:2,
							goods_id:this.data,
							...this.form
						},
						success:res=>{
							uni.showToast({
								title:'编辑成功',
								icon:'none',
								duration: 2000
							})
							setTimeout(() =>{
								this.previous()
							},500)
						}
					})
				} else {
					// 添加
					this.http({
						url:this.api.addShop,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							...this.form
						},
						success:res=>{
							uni.showToast({
								title:'添加成功',
								icon:'none',
								duration: 2000
							})
							setTimeout(() =>{
								this.previous()
							},500) 
						}
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
.good {
	padding: 0 30rpx;
	.group {
		.title {
			width: 128rpx;
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
	font-size: 28rpx;
}
.con {
	width: 516rpx;
	margin-left: 20rpx;
	border: 2rpx solid #E7E7E7;
	border-radius: 8rpx;
	padding: 20rpx;
}
.content {
	display: flex;
	align-items: flex-start;
	.text {
		margin-top: 14rpx;
	}
}
.remarkImage {
    width: 558rpx;
    margin-left: 20rpx;
    flex-wrap: wrap;
    .item_image {
        position: relative;
        width: 160rpx;
		height: 160rpx;
        margin-right: 10rpx;
        margin-top: 10rpx;
        .image {
            width: 160rpx;
            height: 160rpx;
            border-radius: 10rpx;
            object-fit: cover;
        }
		.delete {
            position: absolute;
            width: 36rpx;
            height: 36rpx;
            padding: 10rpx;
            top: -5rpx;
            right: -5rpx;
        }
    }
}
.top {
	padding: 50rpx 150rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 48rpx;
	font-weight: 500;
	color: #C0C4CC;
	image {
		width: 36rpx;
		height: 36rpx;
		margin: 20rpx;
	}
}
</style>
