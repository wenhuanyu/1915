/**
 * Http请求封装
 */
import common from './common.js'
const baseUrl = common.baseUrl
const OK = 1

module.exports = (params) => {
    let url = params.url
    let method = params.method
    let header = params.header || {}
    let data = params.data || {}

    if (method) {
        method = method.toUpperCase()
        if (method == "POST") {
            header = {
                "content-type": "application/x-www-form-urlencoded"
            }
        }
    }

    if (!params.hideLoading) {
        uni.showLoading({
            title: "加载中"
        })
    }

    uni.request({
        url: baseUrl + url,
        method: method || "GET",
        header: header,
        data: data,
        dataType: "json",
        sslVerify: false,
        success: res => {
            uni.hideLoading()
            if (res.data.code != OK) {
                uni.showToast({
                    title: res.data.info,
                    icon: "none"
                })
                return
            }
            typeof params.success == "function" && params.success(res.data.data)
        },
        fail: res => {
            uni.hideLoading()
            uni.showToast({
                title: res.data.info,
                icon: "none"
            })
            typeof params.fail == "function" && params.fail(res.data)
        },
        complete: res => {
            typeof params.complete == "function" && params.complete(res.data)
            return
        }
    })
}
