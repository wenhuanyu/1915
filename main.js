import {
    createSSRApp
} from 'vue'
import App from './App.vue'
import common from './common/common.js'
import http from './common/http.js'
import upload from './common/upload.js'
import api from './common/api.js'
import share from './common/share.js'
import Vue from 'vue'
import GlobalComponent from '@/components/global'
// Vue.use(GlobalComponent)

export function createApp() {
    const app = createSSRApp(App)
    app.config.globalProperties.common = common
    app.config.globalProperties.http = http
    app.config.globalProperties.upload = upload
    app.config.globalProperties.api = api
	app.config.globalProperties.GlobalComponent = GlobalComponent
    app.mixin(share)
    return {
        app
    }
}
