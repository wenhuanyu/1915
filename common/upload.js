/**
 * Upload请求封装
 */
import common from './common.js'
const baseUrl = common.baseUrl
const OK = 1

module.exports = (params) => {
    let url = params.url
    let file = params.file
    let name = params.name || "file"
    let data = params.data || {}

    if (!params.hideLoading) {
        uni.showLoading({
            title: "加载中"
        })
    }

    uni.uploadFile({
        url: baseUrl + url,
        filePath: file,
        name: name,
        formData: data,
        success: res => {
            uni.hideLoading()
            res = JSON.parse(res.data)
            if (res.code != OK) {
                uni.showToast({
                    title: res.info,
                    icon: "none"
                })
                return
            }
            typeof params.success == "function" && params.success(res.data)
        },
        fail: res => {
            uni.hideLoading()
            res = JSON.parse(res.data)
            uni.showToast({
                title: res.info,
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
