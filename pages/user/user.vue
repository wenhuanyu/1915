<template>
    <view class="container">
        <block v-if="isLogin">
            <view class="flex">
                <image class="avatar" :src="avatar"></image>
                <view class="info">
                    <view class="nickname">
                        {{nickname}}
                    </view>
                    <view class="tel">
                        {{tel}}
                    </view>
                </view>
            </view>
			<view class="timeBox">
				<view>剩余使用时间</view>
				<view class="time_day">
					<view class="day">{{expire_in}}</view>
					<view>天</view>
				</view>
			</view>
			<view class="personal_list">
				<block v-for="item in personal_list" :key="item.title">
					<view class="item" @click="jump(item.id)">
						<view class="icon_text">
							<view>
								<image :src="item.icon"></image>
							</view>
							<view class="icon_title">{{item.title}}</view>
						</view>
					</view>
				</block>
				<view class="item">
					<button open-type="contact" class="button">
						<view class="icon_text">
							<view>
								<image src="/static/image/icon6.png"></image>
							</view>
							<view class="icon_title">联系客服</view>
						</view>
					</button>
				</view>
				<block v-for="item in personal_list_my" :key="item.name">
					<navigator class="item" :url="item.url">
						<view class="icon_text">
							<view>
								<image :src="item.image"></image>
							</view>
							<view class="icon_title">{{item.name}}</view>
						</view>
					</navigator>
				</block>
			</view>
			<view class="bottom_text" @click="tiaozhuan">
				技术支持：木子天禾科技
			</view>
        </block>
        <block v-else>
            <view class="flex ">
                <image class="avatar" src="/static/image/user-default.png"></image>
                <view class="login" @click="login">点击登录</view>
            </view>
        </block>
    </view>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                isLogin: false,
                nickname: "",
                tel: "",
                avatar: "",
				expire_in:"",
				personal_list:[],
				personal_list_my:[
					{
						name:'操作记录',
						image:'/static/image/icon5.png',
						url:'/pages/operation/operation/operation'
					},
					// {
					// 	name:'联系客服',
					// 	image:'/static/image/icon6.png',
					// 	url:''
					// },
					{
						name:'帮助中心',
						image:'/static/image/icon7.png',
						url:'/pages/help_center/help_center/help_center'
					},
					{
						name:'电脑端入口',
						image:'/static/image/icon8.png',
						url:'/pages/diannao/diannao'
					},
				]
            }
        },
        onLoad() {
            let state = this.common.get("state")
            if (state == 1) {
                // uni.reLaunch({
                //     url: "/pages/login/login"
                // })
				this.isLogin = false
            } else if (state == 2) {
                this.isLogin = true
            }

            let uid = this.common.get("uid")
            if (uid != "") {
                this.http({
                    url: this.api.userData,
                    method: "POST",
                    data: {
                        uid: uid
                    },
                    success: res => {
                        this.nickname = res.name
                        this.tel = res.phone
                        this.avatar = res.avatarUrl
						this.expire_in = res.expire_in
                    }
                })
            }
			this.userList()
        },
        methods: {
			tiaozhuan(){
				uni.navigateToMiniProgram({
					appId: 'wxa59d080ba74b049a',
					// path: 'page/index/index',
					success(res) {}
			    })
			},
            // 微信小程序登录
            login() {
                // 1.获取用户信息
                uni.getUserProfile({
                    desc: "weixin",
                    success: res => {
						console.log('res',res)
                        let encryptedData = res.encryptedData
                        let iv = res.iv
                        let userInfo = res.userInfo

                        // 2.获取code
                        uni.login({
                            provider: "weixin",
                            success: res => {
                                let code = res.code

                                // 3.登录获取session_key
                                this.http({
                                    url: this.api.login,
                                    method: "POST",
                                    data: {
                                        code: code,
                                    },
                                    success: res => {
                                        if (!res.session_key) {
                                            this.store(res)
                                            return
                                        }
                                        let session_key = res.session_key

                                        // 4.绑定用户信息
                                        this.http({
                                            url: this.api.login,
                                            method: "POST",
                                            data: {
                                                avatar: userInfo.avatarUrl,
                                                nick_name: userInfo.nickName,
                                                sex: 0,
                                                session_key: session_key,
												iv: iv,
												encryptedData: encryptedData
                                            },
                                            success: res => {
                                                this.store(res)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            },
            store(res) {
                this.common.set("uid", res.uid)
                this.common.set("state", res.binding_state)
                if (res.binding_state == 1) {
                    uni.reLaunch({
                        url: "/pages/login/login"
                    })
                } else if (res.binding_state == 2) {
                    uni.reLaunch({
                        url: "/pages/index/index"
                    })
                }
            },
			// 我的页面功能列表接口
			userList() {
				this.http({
					url:this.api.personal,
					method:"POST",
					data:{
						uid: this.common.get("uid")
					},
					success:res =>{
						this.personal_list = res
					}
				})
			},
			// 跳转
			jump(item) {
				console.log('item',item)
				// 客户
				if(item == 35) {
					uni.navigateTo({
						url:"/pages/customer/customer/customer"
					})
				}
				// 供应商
				if(item == 36) {
					uni.navigateTo({
						url:"/pages/supplier/supplier/supplier"
					})
				}
				// 商品
				if(item == 37) {
					uni.navigateTo({
						url:"/pages/goods/goods/goods"
					})
				}
				// 仓库管理
				if(item == 38) {
					uni.navigateTo({
						url:"/pages/warehouse/warehouse/warehouse"
					})
				}
				// 商品分类管理
				if(item == 39) {
					uni.navigateTo({
						url:"/pages/goods_category/goods_category/goods_category"
					})
				}
				// 商品单位
				if(item == 40) {
					uni.navigateTo({
						url:"/pages/commodity_unit/commodity_unit/commodity_unit"
					})
				}
				// 员工管理
				if(item == 42) {
					uni.navigateTo({
						url:"/pages/employees/employees/employees"
					})
				}
				// 公司设置
				if(item == 46) {
					uni.navigateTo({
						url:"/pages/setting/setting/setting"
					})
				}
			}
        }
    }
</script>

<style lang="scss">
    .flex {
        margin-top: 48rpx;

        .info {
            margin-left: 20rpx;

            .nickname {
                font-size: 32rpx;
                font-weight: bold;
            }

            .tel {
                margin-top: 5rpx;
                color: $color-8;
            }
        }

        .login {
            font-size: 36rpx;
            font-weight: bold;
            margin-left: 20rpx;
        }
    }
	.timeBox {
		width: 690rpx;
		height: 110rpx;
		background: linear-gradient(131deg, #6FA2FF 0%, #3076F4 100%);
		box-shadow: 0rpx 2rpx 16rpx 2rpx rgba(144, 144, 144, 0.26);
		border-radius: 8rpx;
		margin-top: 46rpx;
		box-sizing: border-box;
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		line-height: 110rpx;
		font-weight: 400;
		color: #ffffff;
		.time_day {
			display: flex;
			.day {
				font-size: 36rpx;
				font-weight: 600;
				margin-right: 12rpx;
			}
		}
	}
	.personal_list {
		width: 690rpx;
		display: grid;
		justify-content: space-evenly;
		grid-template-columns: repeat(auto-fill, 220rpx);
		grid-gap: 14rpx;
		flex-wrap: wrap;
		.item {
			width: 220rpx;
			height: 150rpx;
			background: #FFFFFF;
			box-shadow: 0px 1px 8px 1px rgba(179, 175, 175, 0.12);
		}
		button::after{
			border: 0; // 或者 border: none;
		}

		.button{
			border-radius: 0!important;
			width: 220rpx!important;
			height: 150rpx!important;
			background: #FFFFFF!important;
		}
	}
	.bottom_text {
		height: 34rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #999999;
		line-height: 34rpx;
		text-align: center;
		margin-top: 100rpx;
	}
    .item {
        margin-top: 20rpx;
        .one {
            width: 220rpx;
            height: 150rpx;
            box-shadow: 0px 2px 16px 2px rgba(179, 175, 175, 0.12);
            border-radius: 8px;
            margin-right: 20rpx;

            .image {
                width: 54rpx;
                height: 54rpx;
                margin-bottom: 10rpx;
            }
        }
    }
</style>
