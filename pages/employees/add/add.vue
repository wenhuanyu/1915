<template>
	<view class="fix-padding">
		<view class="add_title container">添加/编辑</view>
		<view class="container good">
			<view class="group">
			    <view class="title">真实姓名</view>
			    <uni-easyinput class="input" v-model="form.name" placeholder="请输入姓名" ></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">登录手机</view>
			    <uni-easyinput class="input" v-model="form.username" placeholder="请输入手机号"></uni-easyinput>
			</view>
			<view class="group" style="align-items: flex-start;">
			    <view class="title">权限管理</view>
			    <view>
					<view class="ml-10 group_value_box">
						<view class="mb-20">小程序权限</view>
						<checkbox-group name="miniprogramAllCheck" @change="changeAll('min',$event)" class="mb-20">
							<checkbox class="checkClick round" :value="miniprogramAllCheck.value" :checked="miniprogramAllCheck.checked"/>
							<text>{{miniprogramAllCheck.name}}</text>
						</checkbox-group>
						<view>
							<checkbox-group name="check" @change="changeCheck('min',$event)" class="check group_value">
								<view v-for="(item,index) in miniprogram" :key="item.id" class="checkbox mb-20">
									<checkbox class="checkClick round" :value="item.id" :checked="miniprogramArr.includes(String(item.id))">{{item.title}}</checkbox>
								</view>
							</checkbox-group>
						</view>
					</view>
					<view class="ml-10 group_value_box">
						<view class="mb-20">后台权限</view>
						<checkbox-group name="authorizeArrCheck" @change="changeAll('aut',$event)" class="mb-20">
							<checkbox class="checkClick round" :value="authorizeArrCheck.value" :checked="authorizeArrCheck.checked"/>
							<text>{{authorizeArrCheck.name}}</text>
						</checkbox-group>
						<view >
							<checkbox-group name="check" @change="changeCheck('aut',$event)" class="check group_value">
								<view v-for="(item,index) in authorize" :key="item.id" class="checkbox mb-20">
									<checkbox class="checkClick round" :value="item.id" :checked="authorizeArr.includes(String(item.id))">{{item.title}}</checkbox>
								</view>
							</checkbox-group>
						</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">设置密码</view>
			    <uni-easyinput type="password" class="input" v-model="form.password" placeholder="请输入密码"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">确认密码</view>
			    <uni-easyinput type="password" class="input" v-model="againPassword" placeholder="请输入密码"></uni-easyinput>
			</view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">确定添加</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					username:'',
					name:'',
					password:''
				},
				againPassword:'',
				data:'',
				edit:'',
				miniprogram:[],
				authorize:[],
				miniprogramArr:[],
				authorizeArr:[],
				miniprogramAllCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				authorizeArrCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
			}
		},
		onLoad(option) {
			this.edit = option
			// 小程序权限
			this.http({
				url:this.api.miniprogram,
				method:"POST",
				data:{
					uid: this.common.get("uid"),
				},
				success:res=>{
					this.miniprogram = res
				}
			})
			// 后台权限
			this.http({
				url:this.api.authorize,
				method:"POST",
				data:{
					uid: this.common.get("uid"),
				},
				success:res=>{
					this.authorize = res
				}
			})
			if(option.data) {
				this.data = JSON.parse(decodeURIComponent(option.data))
				this.http({
					url:this.api.new_editStaff,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						type:1,
						staff_id:this.data.id
					},
					success:res=>{
						this.form.name = res.name
						this.form.username = res.username
						this.form.password = res.password
						setTimeout(() =>{
							for(let item of res.miniprogram){
								let itemVal=String(item.id)
								if(!this.miniprogramArr.includes(itemVal)){
								    this.miniprogramArr.push(itemVal);
								}
							}
							for(let item of res.authorize){
								let itemVal=String(item.id)
								if(!this.authorizeArr.includes(itemVal)){
								    this.authorizeArr.push(itemVal);
								}
							}
							if(this.miniprogramArr.length==this.miniprogram.length){
							    this.miniprogramAllCheck.checked=true;
							}else{
							    this.miniprogramAllCheck.checked=false;
							}
							if(this.authorizeArr.length==this.authorize.length){
							    this.authorizeArrCheck.checked=true;
							}else{
							    this.authorizeArrCheck.checked=false;
							}
						},50)
					}
				})
			} else {
			}
		},
		methods: {
			// 多选复选框改变事件
			changeCheck(i,e){
				if(i == 'min') {
					this.miniprogramArr = e.detail.value;
					 // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
					if(this.miniprogramArr.length>0 && this.miniprogramArr.length==this.miniprogram.length){
					    this.miniprogramAllCheck.checked=true;
					}else{
					    this.miniprogramAllCheck.checked=false;
					}
					console.log('this.miniprogramArr',this.miniprogramArr)
				} else if(i == 'aut') {
					this.authorizeArr = e.detail.value;
					 // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
					if(this.authorizeArr.length>0 && this.authorizeArr.length==this.authorize.length){
					    this.authorizeArrCheck.checked=true;
					}else{
					    this.authorizeArrCheck.checked=false;
					}
				}
			    
			},
			// 全选事件
			changeAll(i,e){
			    let chooseItem = e.detail.value;
			    // 全选
				if(i == 'min') {
					if(chooseItem[0]=='all'){
					    this.miniprogramAllCheck.checked=true;
					    for(let item of this.miniprogram){
					        let itemVal=String(item.id);
					        if(!this.miniprogramArr.includes(itemVal)){
					            this.miniprogramArr.push(itemVal);
							}
					    }
					}else{
					    // 取消全选
					    this.miniprogramAllCheck.checked=false;
					    this.miniprogramArr=[];
					}
				} else if(i=='aut') {
					if(chooseItem[0]=='all'){
					    this.authorizeArrCheck.checked=true;
					    for(let item of this.authorize){
					        let itemVal=String(item.id);
					        if(!this.authorizeArr.includes(itemVal)){
					            this.authorizeArr.push(itemVal);
							}
					    }
					}else{
					    // 取消全选
					    this.authorizeArrCheck.checked=false;
					    this.authorizeArr=[];
					}
				}
			    
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
				if(this.edit.data) {
					if(this.form.password !== this.againPassword) {
						uni.showToast({
							title:'两次输入密码不同',
							icon:'none',
							duration: 2000
						})
						return;
					}
					// 编辑
					this.http({
						url:this.api.new_editStaff,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							type:2,
							staff_id:this.data.id,
							miniprogram:this.miniprogramArr,
							authorize:this.authorizeArr,
							...this.form
						},
						success:res=>{
							this.previous()
						}
					})
				} else {
					if(this.form.password !== this.againPassword) {
						uni.showToast({
							title:'两次输入密码不同',
							icon:'none',
							duration: 2000
						})
						return;
					}
					// 添加
					this.http({
						url:this.api.new_addStaff,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							miniprogram:this.miniprogramArr,
							authorize:this.authorizeArr,
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

<style lang="scss">
.group_value_box {
	font-size: 28rpx;
	font-weight: 500;
	color: $color-3;
	.group_value{
		width: 500rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
		.checkbox{
			width: 240rpx;
		}
	}
}
</style>
