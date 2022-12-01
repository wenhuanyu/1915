<script>
    export default {
        onLaunch: function() {

        },
        onShow: function() {

        },
        onHide: function() {

        }
    }
</script>

<style lang="scss">
    @import '@/static/css/helper.scss';
    @import '@/static/css/frame.scss';
	//设置圆角
	radio.round .wx-radio-input,
	radio.round .uni-radio-input,
	checkbox.round .wx-checkbox-input,
	checkbox.round .uni-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		border-color: #2578FF !important;
	}
	
	//设置背景色
	radio.checkClick[checked] .wx-radio-input,
	radio.checkClick.checked .uni-radio-input,
	checkbox.checkClick[checked] .wx-checkbox-input,
	checkbox.checkClick.checked .uni-checkbox-input{
		background-color: #2578FF !important;
		border-color: #2578FF !important;
		color: #ffffff !important;
	}
</style>
