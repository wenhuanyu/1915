(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/commodity_unit/add/add"],{"0985":function(t,n,i){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{unit_name:"",name:"新增单位",button_text:"确定添加"}},onLoad:function(n){var i=this;this.edit=n,n.data?(t.setNavigationBarTitle({title:"编辑单位"}),this.name="编辑单位",this.button_text="确定修改",this.data=JSON.parse(decodeURIComponent(n.data)),this.http({url:this.api.editShopUnit,method:"POST",data:{uid:this.common.get("uid"),type:1,unit_id:this.data.id,unit_name:this.data.unit_name},success:function(t){i.unit_name=t.unit_name}})):(this.title_text="新增单位",this.button_text="确定添加")},methods:{previous:function(){var n=getCurrentPages(),i=n[n.length-2];t.navigateBack({success:function(){i.onLoad()}})},submit:function(){var n=this;this.edit.data?this.http({url:this.api.editShopUnit,method:"POST",data:{uid:this.common.get("uid"),type:2,unit_id:this.data.id,unit_name:this.unit_name},success:function(i){t.showToast({title:"编辑成功",icon:"none"}),setTimeout((function(){n.previous()}),500)}}):this.http({url:this.api.addShopUnit,method:"POST",data:{uid:this.common.get("uid"),unit_name:this.unit_name},success:function(i){t.showToast({title:"添加成功",icon:"none"}),setTimeout((function(){n.previous()}),500)}})}}};n.default=i}).call(this,i("d5d0")["default"])},2204:function(t,n,i){"use strict";i.r(n);var e=i("0985"),u=i.n(e);for(var a in e)"default"!==a&&function(t){i.d(n,t,(function(){return e[t]}))}(a);n["default"]=u.a},"6e16":function(t,n,i){"use strict";i.d(n,"b",(function(){return u})),i.d(n,"c",(function(){return a})),i.d(n,"a",(function(){return e}));var e={uniEasyinput:function(){return i.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(i.bind(null,"3c6f"))}},u=function(){var t=this,n=t.$createElement;t._self._c},a=[]},"739c":function(t,n,i){"use strict";i.r(n);var e=i("6e16"),u=i("2204");for(var a in u)"default"!==a&&function(t){i.d(n,t,(function(){return u[t]}))}(a);var o,s=i("f0c5"),c=Object(s["a"])(u["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],o);n["default"]=c.exports},f028:function(t,n,i){"use strict";(function(t){i("2e6c");e(i("dc04"));var n=e(i("739c"));function e(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(n.default)}).call(this,i("97ff")["createPage"])}},[["f028","common/runtime","common/vendor"]]]);