(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/operation/details/details"],{"36f2":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{operation_id:"",type_name:"",content:""}},onLoad:function(t){console.log("option",t),t.data&&(this.operation_id=JSON.parse(decodeURIComponent(t.data)).id,this.listInterface())},methods:{listInterface:function(){var t=this;this.http({url:this.api.operation_details,method:"POST",data:{uid:this.common.get("uid"),operation_id:this.operation_id},success:function(e){t.type_name=e.type_name,t.content=e.content}})}}};e.default=o},"3ad8":function(t,e,n){"use strict";n.r(e);var o=n("d3f0"),a=n("6fbc");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);var r,u=n("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=c.exports},"6fbc":function(t,e,n){"use strict";n.r(e);var o=n("36f2"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},bdde:function(t,e,n){"use strict";(function(t){n("2e6c");o(n("dc04"));var e=o(n("3ad8"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("97ff")["createPage"])},d3f0:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement;t._self._c},i=[]}},[["bdde","common/runtime","common/vendor"]]]);