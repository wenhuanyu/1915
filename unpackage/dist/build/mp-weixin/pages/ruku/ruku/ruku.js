(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ruku/ruku/ruku"],{2423:function(t,e,n){"use strict";(function(t){function n(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=i(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,c=function(){};return{s:c,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return o=t.done,t},e:function(t){u=!0,a=t},f:function(){try{o||null==n.return||n.return()}finally{if(u)throw a}}}}function i(t,e){if(t){if("string"===typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c={data:function(){return{search_name:"",start_time:"",end_time:"",list:[],allCheck:{name:"全选",value:"all",checked:!1},checkedArr:[],page:0}},onLoad:function(){this.listInterface()},onReachBottom:function(){var e=this;this.http({url:this.api.import_list,method:"POST",data:{uid:this.common.get("uid"),search_name:this.search_name,start_time:this.start_time,end_time:this.end_time,page:this.page},success:function(n){e.page+=1,0==n.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):e.list=e.list.concat(n.list)}})},methods:{listInterface:function(){var t=this;this.page=0,this.http({url:this.api.import_list,method:"POST",data:{uid:this.common.get("uid"),search_name:this.search_name,start_time:this.start_time,end_time:this.end_time,page:this.page},success:function(e){t.page+=1,t.list=e.list}})},search:function(){this.listInterface()},changeCheck:function(t){this.checkedArr=t.detail.value,this.checkedArr.length>0&&this.checkedArr.length==this.list.length?this.allCheck.checked=!0:this.allCheck.checked=!1,console.log("this.checkedArr",this.checkedArr)},changeAll:function(t){var e=t.detail.value;if("all"==e[0]){this.allCheck.checked=!0;var i,r=n(this.list);try{for(r.s();!(i=r.n()).done;){var c=i.value,a=String(c.id);this.checkedArr.includes(a)||this.checkedArr.push(a)}}catch(o){r.e(o)}finally{r.f()}}else this.allCheck.checked=!1,this.checkedArr=[];console.log("this.checkedArr",this.checkedArr)},del:function(){var e=this;0!=this.checkedArr.length?t.showModal({title:"提示",content:"确定要删除选择的入库吗？",success:function(t){t.confirm&&e.http({url:e.api.import_del,method:"POST",data:{uid:e.common.get("uid"),import_id:e.checkedArr},success:function(t){e.listInterface(),e.checkedArr=[],e.allCheck.checked=!1}})},fail:function(){},complete:function(){}}):t.showToast({title:"请选择要删除的入库",icon:"none",duration:2e3})},detail:function(e){t.navigateTo({url:"/pages/ruku/details/details?data="+encodeURIComponent(JSON.stringify(e))})}}};e.default=c}).call(this,n("d5d0")["default"])},"8ab4":function(t,e,n){"use strict";(function(t){n("2e6c");i(n("dc04"));var e=i(n("b2ce"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("97ff")["createPage"])},"9b42":function(t,e,n){"use strict";var i=n("b471"),r=n.n(i);r.a},b2ce:function(t,e,n){"use strict";n.r(e);var i=n("b70a"),r=n("b923");for(var c in r)"default"!==c&&function(t){n.d(e,t,(function(){return r[t]}))}(c);n("9b42");var a,o=n("f0c5"),u=Object(o["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=u.exports},b471:function(t,e,n){},b70a:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return i}));var i={uniEasyinput:function(){return n.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(n.bind(null,"3c6f"))},uniDatetimePicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker")]).then(n.bind(null,"826d"))}},r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.list,(function(e,n){var i=t.__get_orig(e),r=t.checkedArr.includes(String(e.id));return{$orig:i,g0:r}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},c=[]},b923:function(t,e,n){"use strict";n.r(e);var i=n("2423"),r=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);e["default"]=r.a}},[["8ab4","common/runtime","common/vendor"]]]);