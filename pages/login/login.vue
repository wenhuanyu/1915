<template>
    <view class="container">
        <!-- <uni-swiper-dot class="swiper" :info="banner" :current="current" field="content" mode="default">
            <swiper autoplay="true" interval="2000" duration="500" circular="true" @change="change">
                <swiper-item v-for="item in banner" :key="item.id">
                    <image class="image" :src="item.image" mode="aspectFill"></image>
                </swiper-item>
            </swiper>
        </uni-swiper-dot> -->
		<view style="display: flex;align-items: center;justify-content: space-around;">
			<image class="image" src="/static/image/banner.png" style="width: 690rpx; height: 300rpx;margin-bottom: 10px;"></image>
		</view>
        <view class="clear"></view>
        <input class="input" type="text" v-model="username" placeholder="请输入账号" />
        <input class="input" type="password" v-model="password" placeholder="请输入密码" />
        <view class="notice flex">
            <image class="image" src="/static/image/notice.png"></image>
            <text class="text">温馨提示：账号密码请联系管理员获取。</text>
        </view>
        <button class="btn-submit" @click="bind">登录</button>
    </view>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                username: "",
                password: "",
                banner: [],
                current: 0,
            }
        },
        onLoad() {
            this.http({
                url: this.api.banner,
                method: "POST",
                data: {},
                success: res => {
                    this.banner = res
                }
            })
        },
        methods: {
            change(e) {
                this.current = e.detail.current;
            },
            bind() {
                this.http({
                    url: this.api.bind,
                    method: "POST",
                    data: {
                        username: this.username,
                        password: this.password,
                        uid: this.common.get("uid")
                    },
                    success: res => {
                        this.common.set('uid', res.uid)
                        this.common.set('state', res.binding_state)
                        uni.reLaunch({
                            url: "/pages/index/index"
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .container {
        padding: 40rpx 40rpx 0;

        .swiper {

            .image {
                width: 100%;
                height: 300rpx;
                border-radius: 25rpx;
            }
        }

        .clear {
            margin-bottom: 50rpx;
        }

        .input {
            height: 100rpx;
            border-bottom: 2rpx solid #EFEFEF;
            margin-bottom: 20rpx;
        }

        .notice {
            margin-top: 40rpx;

            .image {
                width: 32rpx;
                height: 32rpx;
                margin-right: 20rpx;
            }

            .text {
                font-size: 28rpx;
                color: $color-8;
            }
        }

        .btn-submit {
            width: 670rpx;
            margin-top: 50rpx;
        }
    }
</style>
