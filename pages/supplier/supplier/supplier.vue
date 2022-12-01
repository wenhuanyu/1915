<template>
	<view class="background fix-padding"  @click="hideIsShow">
		<view class="container input-search">
			<view class="flex ">
				<uni-easyinput class="input" v-model="search_name" placeholder="请输入供应商名查询"></uni-easyinput>
				<button class="btn-search" @click="search">搜索</button>
			</view>
		</view>
		<view class="customer_list container">
			<block v-for="(item,index) in list" :key='item.id'>
				<view class="list_box container">
					<view class="list">
						<view><image src="/static/image/icon1.png"></image></view>
						<view class="title">供应商名称</view>
						<view class="value">{{item.nick_name}}</view>
						<view><image class="edit_del" src="/static/image/edit_del.png" @click.stop="edit_del_click(item,index)"></image></view>
					</view>
					<view class="list">
						<view><image src="/static/image/icon2.png"></image></view>
						<view class="title">联系电话</view>
						<view class="value">{{item.mobile}}</view>
					</view>
					<view class="list">
						<view><image src="/static/image/icon3.png"></image></view>
						<view class="title">供应商地址</view>
						<view class="value">{{item.addres}}</view>
					</view>
					<view class="list mb-0">
						<view><image src="/static/image/icon4.png"></image></view>
						<view class="title">备注内容</view>
						<view class="value">{{item.remark}}</view>
					</view>
					<view class="list_click" :class="[isShow  == index ?'show' :'hide']">
						<view class="list_click_text list_click_edit" @click="editor(item)">编辑</view>
						<view class="list_click_text list_click_del" @click="del(item)">删除</view>
						<view class="list_click_text list_click_default">默认</view>
					</view>
				</view>
			</block>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">添加</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				search_name:'',
				isShow:-1
			}
		},
		onLoad() {
			this.interface()
		},
		methods: {
			// 供应商列表接口
			interface() {
				this.http({
					url:this.api.merchantList,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						search_name:this.search_name
					},
					success:res =>{
						this.list = res
					}
				})
			},
			// 搜索
			search() {
				this.interface()
			},
			// 按钮点击
			edit_del_click(i,eve) {
				let that = this
				if(eve == that.isShow) {
					that.isShow = -1;
					return false;
				}
				that.isShow = eve;
			},
			// 隐藏
			hideIsShow() {
				this.isShow = -1;
			},
			// 添加按钮点击
			add() {
				uni.navigateTo({
					url:"/pages/supplier/add/add"
				})
			},
			// 编辑
			editor(eve) {
				uni.navigateTo({
					url:'/pages/supplier/add/add?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
			// 删除
			del(eve) {
				uni.showModal({
					title: '提示',
					content: '确定要删除当前供应商吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.deleteMerchant,
								method:"POST",
								data:{
									uid: this.common.get("uid"),
									merchant_id:eve.id
								},
								success:res =>{
									this.interface()
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
.customer_list{
	width: 750rpx;
	background: $color-f;
	border-radius: 2rpx;
}
</style>
