<template>
	<view class="fix-padding">
		<view class="container">
			<radio-group @change="radioChange">
				<view class="itemList mb-20" v-for="(item,index) in list" :key="item.id">
					<view class="itemList_top">
						<view class="mr-20">商品分类名称</view>
						<view>{{item.name}}</view>
					</view>
					<view class="flex">
						<button class="button button_color mr-20" @click="editor(item)">编辑</button>
						<button class="button mr-20"  @click="del(item)">删除</button>
						<button class="button button_color_last" v-if="item.status == 1" @click="on_off(item)">停用</button>
						<button class="button button_color_last" v-else style="background: #007AFF;" @click="on_off(item)">启用</button>
					</view>
				</view>
			</radio-group>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="submit">添加</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				current:0,
			}
		},
		onLoad() {
			this.listInterface()
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
				    url: this.api.shopType,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				    },
				    success: res => {
				        this.list = res
				    }
				})
			},
			radioChange(eve) {
				
			},
			// 添加
			submit() {
				uni.navigateTo({
					url:'/pages/goods_category/add/add'
				})
			},
			// 编辑
			editor(eve) {
				uni.navigateTo({
					url:'/pages/goods_category/add/add?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
			// 启用 停用
			on_off(eve) {
				let num = ''
				if(eve.status == 1) {
					num = 2
				} else {
					num = 1
				}
				this.http({
					url:this.api.on_off,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						type:num,
						cate_id:eve.id
					},
					success:res =>{
						this.listInterface()
					}
				})
			},
			// 删除
			del(eve) {
				uni.showModal({
					title: '提示',
					content: '确定要删除当前分类？',
					success: res => {
						if(res.confirm) {
							this.http({
								url:this.api.deleteShopType,
								method:"POST",
								data:{
									uid: this.common.get("uid"),
									cate_id:eve.id
								},
								success:res =>{
									this.listInterface()
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
.itemList {
	font-size: 28rpx;
	font-weight: 400;
	color: #3D4154;
	padding: 30rpx;
	background: $color-f;
	box-shadow: 0rpx 2rpx 16rpx 2rpx rgba(179, 175, 175, 0.25);
	border-radius: 8rpx;
	display: flex;
	align-items:center;
	justify-content: space-between;
	.itemList_top {
		display: flex;
		align-items:center;
	}
	.button {
		height: 40rpx;
		line-height: 40rpx;
		padding: 0 14rpx;
		font-size: 20rpx;
		font-weight: 400;
		color: $color-f;
		background: #F96164;
		border-color: #F96164!important;
	}
	.button_color {
		background: #F9B261;
		border-color: #F9B261!important;
	}
	.button_color_last {
		background: #34BCB5;
		border-color: #34BCB5!important;
	}
	.itemList_bottom_text {
		display: flex;
		align-items: center;
	}
	
}
</style>
