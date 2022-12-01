<template>
	<view class="fix-padding">
		<view class="container good">
			<view class="group">
			    <view class="title">公司名称</view>
			    <uni-easyinput class="input" v-model="form.shop_name" placeholder="请输入TA企业名称或者姓名" ></uni-easyinput>
			</view>
			<view class="group content">
				<view class="title">公司头像</view>
				<view class="remarkImage flex">
					<view class="item_image" @click="uploadImage">
						<image class="image" src="/static/image/paizhao.png"></image>
					</view>
					<view class="item_image" v-if="form.shop_logo==''">
						<image class="image" src="/static/image/wu.png"></image>
					</view>
					<view class="item_image" v-else>
						<image class="image image_last" :src="form.shop_logo" @click="previewImage(index)"></image>
					</view>
				</view>
			</view>
			<button class="btn-submit" @click="add">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					shop_name:'',//供应商名称
					shop_logo:'',
				},
				data:'',
				
			}
		},
		onLoad() {
			this.http({
				url:this.api.merchant,
				method:"POST",
				data:{
					uid: this.common.get("uid"),
				},
				success:res=>{
					this.form = res
				}
			})
		},
		methods: {
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
						            this.form.shop_logo=data.data.url
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
				imgsArray[0] = this.form.shop_logo;
				wx.previewImage({
					current: 0,
					urls: imgsArray,
				})
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
				this.http({
					url:this.api.eidt_merchant,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						shop_id:this.common.get("uid"),
						...this.form
					},
					success:res=>{
						this.previous()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
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
		overflow:hidden;
        .image {
            width: 100%;
            height: 100%;
			object-fit:cover;
        }
		.image_last {
			border-radius: 50%;
		}
    }
}
.btn-submit {
	margin-top: 200rpx;
}
</style>
