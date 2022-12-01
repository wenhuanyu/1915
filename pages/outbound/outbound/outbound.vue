<template>
	<view class="background fix-padding">
		<!-- 新建信息按钮 -->
		<view class="container add">
			<navigator url="/pages/outbound/add/add">
				<button class="flex" type="default">
					<image class="image" src="/static/image/add.png"></image>
				    <view>新建出库</view>
				</button>
			</navigator>
		</view>
		<!-- 搜索 -->
		<view class="container search">
			<view class="flex">
			    <uni-easyinput class="input" v-model="search_name" placeholder="请输入仓库名称"></uni-easyinput>
			    <button class="btn-search" @click="search">搜索</button>
			</view>
			<view class="flex mt-20">
				<view class="text">自定义查</view>
				<uni-datetime-picker class="date-picker" ref="formDate" v-model="start_time" type="date" placeholder="开始时间"/>
				至
				<uni-datetime-picker class="date-picker" ref="formDate" v-model="end_time" type="date" placeholder="结束时间"/>
				<button class="btn-search btn-color" @click="search">查询</button>
			</view>
		</view>
		<!-- 列表 -->
		<view class="container list">
		    <checkbox-group name="check" @change="changeCheck" class="check">
				<view class="item" v-for="(item,index) in list" :key="item.id">
				    <view class="big ellipsis">
				        出库单号{{item.order_num}}
				    </view>
				    <view class="flex top .mb-10">
				        <view class="title grey">件数</view>
				        <view class="value">{{item.total_count}}</view>
				    </view>
				    <view class="flex .mb-10">
				        <view class="title grey">时间</view>
				        <view class="value">{{item.create_time}}</view>
				    </view>
				    <view class="flex .mb-10 last">
				        <view class="title grey">备注</view>
				        <view class="value">{{item.remark}}</view>
				    </view>
				    <view class="arrow flex flex-column" @click="detail(item.id)">
				        <view>详情</view>
				    </view>
					<view class="checkbox">
						<checkbox class="checkClick round" :value="item.id" :checked="checkedArr.includes(String(item.id))"></checkbox>
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
				search_name:'',
				start_time:'',
				end_time:'',
				list:[],
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				checkedArr:[], //复选框选中的值
				page:0,
			}
		},
		onLoad() {
			// 出库记录接口
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			// 出库记录接口
			this.http({
			    url: this.api.export,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
			        search_name: this.search_name,
					start_time:this.start_time,
					end_time:this.end_time,
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
				    url: this.api.export,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        search_name: this.search_name,
						start_time:this.start_time,
						end_time:this.end_time,
						page:this.page
				    },
				    success: res => {
				        this.page+=1
				        this.list = res.list
				    }
				})
			},
			// 搜索 查询按钮点击
			search() {
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
			// 删除按钮
			del(){
				if(this.checkedArr.length == 0) {
					uni.showToast({
						title: '请选择要删除的出库',
						icon:'none',
						duration: 2000
					});
					return;
				}
				uni.showModal({
					title: '提示',
					content: '确定要删除选择的出库吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.export_del,
							    method: "POST",
							    data: {
							        uid: this.common.get("uid"),
							        export_id:this.checkedArr
							    },
							    success: res => {
							        // 出库记录接口
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
			},
			// 详情按钮点击
			detail(eve){
				uni.navigateTo({
					url:'/pages/outbound/details/details?data='+encodeURIComponent(JSON.stringify(eve))
				})
			}
			
		}
	}
</script>

<style lang="scss">
.btn-color {
	width: 120rpx!important;
	height: 64rpx;
	line-height: 64rpx;
	background: $color-b5;
}
.search .uni-date-editor--x .uni-date__icon-clear {
	top: -4rpx;
}
.uni-date-single {
	padding: 0!important;
	height: 64rpx;
}
.date-picker {
	width: 42%!important;
}
.uniui-calendar {
	display: none;
}
</style>
