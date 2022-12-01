<template>
	<view class="fix-padding">
		<view class="add_title container">{{title_text}}</view>
		<view class="container good">
			<view class="group">
			    <view class="title">客户名称</view>
			    <uni-easyinput class="input" v-model="form.nick_name" placeholder="请输入TA企业名称或者姓名" ></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">手机号码</view>
			    <uni-easyinput class="input" v-model="form.mobile" placeholder="请输入TA的联系手机号码"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">联系地址</view>
			    <uni-easyinput class="input" v-model="form.addres" placeholder="请输入他的单位地址"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">客户备注</view>
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
					nick_name:'',//供应商名称
					mobile:'',//手机号
					addres:'',//地址
					remark:'',//备注
					relation_name:'',//联系人姓名
				},
				data:'',
				title_text:'',
				edit:'',
				button_text:''
				
			}
		},
		onLoad(option) {
			this.edit = option
			if(option.data) {
				uni.setNavigationBarTitle({
				    title: '编辑客户'
				});
				this.title_text = "编辑客户"
				this.button_text ="确定修改"
				this.data = JSON.parse(decodeURIComponent(option.data))
				this.http({
					url:this.api.editClient,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						type:1,
						client_id:this.data.id
					},
					success:res=>{
						this.form = res[0]
					}
				})
				console.log('this.data',this.data)
			} else {
				this.title_text = "添加客户"
				this.button_text ="确定添加"
			}
			console.log('this.title_text',this.title_text)
		},
		methods: {
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
				if(this.edit.data) {
					// 编辑
					this.http({
						url:this.api.editClient,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							type:2,
							client_id:this.data.id,
							...this.form
						},
						success:res=>{
							this.previous()
						}
					})
				} else {
					// 添加
					console.log('this.form',this.form)
					this.http({
						url:this.api.addClient,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							...this.form
						},
						success:res=>{
							this.previous()
						}
					})
				}
				
			}
		}
	}
</script>

<style>

</style>
