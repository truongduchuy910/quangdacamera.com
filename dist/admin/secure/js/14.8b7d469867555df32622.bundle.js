(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{207:function(t,e,r){"use strict";r.r(e);var a=r(6),c=(r(24),r(187),r(186));function n(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}class l extends c.a{constructor(t){const e="defaultValue"in t&&t.defaultValue;for(var r=arguments.length,c=new Array(r>1?r-1:0),l=1;l<r;l++)c[l-1]=arguments[l];super(function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach((function(e){Object(a.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},t,{defaultValue:e}),...c),Object(a.a)(this,"serialize",t=>t[this.path]),Object(a.a)(this,"deserialize",t=>t[this.path]),Object(a.a)(this,"getFilterGraphQL",t=>{let{type:e,value:r}=t;const a="is"===e?"".concat(this.path):"".concat(this.path,"_").concat(e);return"".concat(a,": ").concat(r)}),Object(a.a)(this,"getFilterLabel",t=>{let{label:e}=t;return"".concat(this.label," ").concat(e.toLowerCase())}),Object(a.a)(this,"formatFilter",t=>{let{label:e,value:r}=t;return"".concat(this.getFilterLabel({label:e}),': "').concat(r,'"')}),Object(a.a)(this,"getFilterTypes",()=>[{type:"is",label:"Is",getInitialValue:()=>"true"},{type:"not",label:"Is not",getInitialValue:()=>"true"}])}}e.default=l}}]);