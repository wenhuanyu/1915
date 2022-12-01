<template>
	<view class="fix-padding">
		<view class="banner flex">
			<navigator url="/pages/employees/add/add">
				<button class="button">
					<image src="/static/image/jia.png"></image>
					<view>添加员工</view>
				</button>
			</navigator>
		</view>
		<!-- 搜索 -->
		<view class="container search">
			<view class="flex">
			    <uni-easyinput class="input" v-model="search_name" placeholder="请输入账号或姓名"></uni-easyinput>
			    <button class="btn-search" @click="search" style="background:#F96164 ;">搜索</button>
			</view>
		</view>
		<!-- 列表 -->
		<view class="container list_per">
		    <checkbox-group name="check" @change="changeCheck" class="check">
				<view class="item" v-for="(item,index) in list" :key="item.id">
					<view class="checkbox">
						<checkbox class="checkClick round" :value="item.id" :checked="checkedArr.includes(String(item.id))"></checkbox>
					</view>
				    <view>
						<view class="flex top .mb-10">
						    <view class="title grey">姓名</view>
						    <view class="value">{{item.name}}</view>
						</view>
						<view class="flex .mb-10">
						    <view class="title grey">小程序权限</view>
						    <view class="value">
								<view v-for="(item1,index1) in item.miniprogram" class="mr-10">
									{{item1.title}}
								</view>
							</view>
						</view>
						<view class="flex .mb-10 ">
						    <view class="title grey">后台权限</view>
						    <view v-for="(item2,index2) in item.authorize" class="mr-10">
						    	{{item2.title}}
						    </view>
						</view>
						<view class="flex .mb-10 last">
						    <view class="title grey">账号</view>
						    <view class="value">{{item.username}}</view>
						</view>
					</view>
					<view class="arrow" v-if="item.act_status == 0">
					    <view class="arrow_box arrow_color">未激活</view>
						<image src="/static/image/hui.png"></image>
					</view>
					<view class="arrow" v-if="item.act_status == 1">
					    <view class="arrow_box">已激活</view>
						<image src="/static/image/lan.png" @click="editor(item)"></image>
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
				list:[],
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				checkedArr:[], //复选框选中的值
				search_name:'',
				page:0,
			}
		},
		onLoad() {
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			// 入库记录接口
			this.http({
			    url: this.api.staffList,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
			        search_name: this.search_name,
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
				    url: this.api.staffList,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						search_name:this.search_name,
						page:this.page
				    },
				    success: res => {
						this.page+=1
				        this.list = res.list
				    }
				})
			},
			search(){
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
				console.log('this.checkedArr',this.checkedArr)
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
				console.log('this.checkedArr',this.checkedArr)
			},
			// 编辑
			editor(eve) {
				uni.navigateTo({
					url:'/pages/employees/add/add?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
			// 删除
			del() {
				uni.showModal({
					title: '提示',
					content: '确定要删除当前员工？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.deleteStaff,
								method:"POST",
								data:{
									uid: this.common.get("uid"),
									staff_id:this.checkedArr
								},
								success:res =>{
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
			}
		}
	}
</script>

<style lang="scss">
.banner {
    width: 750rpx;
    height: 192rpx;
    background: #2578FF;
    box-sizing: border-box;
    padding: 30rpx;
    color: $color-f;
	display: flex;
	align-items: center;
	justify-content: center;
	.button {
		width: 280rpx;
		height: 80rpx;
		background: #ffffff;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-size: 400;
		color: #5793FF;
		display: flex;
		align-items: center;
		justify-content: center;
		image {
			width: 24rpx;
			height: 24rpx;
			margin-right: 6rpx;
		}
	}
}
.list_per {
	position: relative;
    background-color: $color-f;
	.flex {
		align-items: initial;
	}
	.checkbox {
		margin-right: 15rpx;
	}
    .item {
        position: relative;
        width: 690rpx;
        box-shadow: 0rpx 2rpx 16rpx 2rpx rgba(179, 175, 175, 0.25);
        border-radius: 8rpx;
        margin-bottom: 20rpx;
        padding: 30rpx 0 30rpx 30rpx;
        box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: $color-3;
        &:last-child {
            margin-bottom: 0;
        }
        .title {
            font-weight: normal;
        }
		.value {
			width: 300rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}
        .big {
            font-size: 32rpx;
			font-weight: 500;
            width: 580rpx;
            margin-bottom: 10rpx;
        }

        .grey {
            margin-right: 20rpx;
        }

        .ellipsis2 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            width: 550rpx;
        }

        .arrow {
			image{
				width: 60rpx;
				height: 60rpx;
				margin-left: 25rpx;
			}
			.arrow_box {
				width: 118rpx;
				height: 40rpx;
				background: #DFEBFF;
				border-radius: 36rpx 0rpx 0rpx 36rpx;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 40rpx;
				color: #2A7AFF;
				text-align: center;
				margin-bottom: 25rpx;
			}
			.arrow_color{
				color: #F96164;
				background: #FFECED;
			}
        }
		
    }
}
</style>
