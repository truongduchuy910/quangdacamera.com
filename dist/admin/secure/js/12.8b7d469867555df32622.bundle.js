(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{203:function(t,e,n){"use strict";n.r(e);var r=n(6),a=(n(24),n(187),n(186));function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}class i extends a.a{constructor(t){var e;const n="defaultValue"in t?t.defaultValue:t.many?[]:null;for(var a=arguments.length,i=new Array(a>1?a-1:0),l=1;l<a;l++)i[l-1]=arguments[l];super(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},t,{defaultValue:n}),...i),e=this,Object(r.a)(this,"getQueryFragment",(function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.path;return"\n      ".concat(t," {\n        id\n        _label_\n      }\n    ")})),Object(r.a)(this,"getFilterGraphQL",t=>{let{type:e,value:n}=t;return"contains"===e?"".concat(this.path,'_some: {id: "').concat(n,'"}'):"is"===e?"".concat(this.path,': {id: "').concat(n,'"}'):void 0}),Object(r.a)(this,"getFilterLabel",t=>{let{label:e}=t;return"".concat(this.label," ").concat(e.toLowerCase())}),Object(r.a)(this,"formatFilter",t=>{let{label:e,value:n}=t;return"".concat(this.getFilterLabel({label:e}),': "').concat(n,'"')}),Object(r.a)(this,"serialize",t=>{const{path:e}=this,{many:n}=this.config;let r=t[e];if(n){let t=[];return Array.isArray(r)&&(t=r.map(t=>t.id)),{disconnectAll:!0,connect:t.map(t=>({id:t}))}}return r?{connect:{id:r.id}}:{disconnectAll:!0}}),Object(r.a)(this,"getFilterTypes",()=>{const{many:t}=this.config;return t?[{type:"contains",label:"Contains",getInitialValue:()=>null}]:[{type:"is",label:"Is",getInitialValue:()=>null}]})}getRefList(){const{getListByKey:t}=this.adminMeta,{ref:e}=this.config;return t(e)}}e.default=i}}]);