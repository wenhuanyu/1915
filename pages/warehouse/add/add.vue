<template>
	<view class="background">
		<view class="group container">
		    <view class="title">{{name}}</view>
		   <uni-easyinput type="text" class="input" v-model="unit_name" placeholder="请输入"
		       placeholder-style="color:#8D8D8D;">
		   </uni-easyinput>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="submit">{{button_text}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				unit_name:'',
				name:'添加仓库',
				button_text:'确定添加'
			}
		},
		onLoad(option) {
			this.edit = option
			if(option.data) {
				uni.setNavigationBarTitle({
				    title: '编辑仓库'
				});
				this.name = "编辑仓库"
				this.button_text ="确定修改"
				this.data = JSON.parse(decodeURIComponent(option.data))
				this.http({
					url:this.api.editWarehouse,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						type:1,
						warehouse_id:this.data.id,
						warehouse_name	:this.data.unit_name
					},
					success:res=>{
						this.unit_name = res.warehouse_name	
					}
				})
			} else {
				this.title_text = "添加仓库"
				this.button_text ="确定添加"
			}
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
			// 按钮
			submit() {
				if(this.edit.data) {
					// 编辑
					this.http({
						url:this.api.editWarehouse,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							type:2,
							warehouse_id:this.data.id,
							warehouse_name:this.unit_name
						},
						success:res=>{
							uni.showToast({
							    title: "编辑成功",
							    icon: "none"
							})
							setTimeout(() =>{
								this.previous()
							},500) 
						}
					})
				} else {
					// 添加
					this.http({
					    url: this.api.addWarehouse,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							warehouse_name	:this.unit_name
					    },
					    success: res => {
							uni.showToast({
							    title: "添加成功",
							    icon: "none"
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

<style>
</style>
