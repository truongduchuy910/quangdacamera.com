(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{189:function(t,e){!function(t,e){"use strict";if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)"isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var n=[];o.prototype.THROTTLE_TIMEOUT=100,o.prototype.POLL_INTERVAL=null,o.prototype.USE_MUTATION_OBSERVER=!0,o.prototype.observe=function(t){if(!this._observationTargets.some((function(e){return e.element==t}))){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},o.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter((function(e){return e.element!=t})),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},o.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},o.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},o.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter((function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]}))},o.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map((function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}}));return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},o.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(i(t,"resize",this._checkForIntersections,!0),i(e,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},o.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},o.prototype._checkForIntersections=function(){var e=this._rootIsInDom(),n=e?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach((function(o){var i=o.element,s=c(i),a=this._rootContainsTarget(i),l=o.entry,u=e&&a&&this._computeTargetAndRootIntersection(i,n),h=o.entry=new r({time:t.performance&&performance.now&&performance.now(),target:i,boundingClientRect:s,rootBounds:n,intersectionRect:u});l?e&&a?this._hasCrossedThreshold(l,h)&&this._queuedEntries.push(h):l&&l.isIntersecting&&this._queuedEntries.push(h):this._queuedEntries.push(h)}),this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},o.prototype._computeTargetAndRootIntersection=function(n,r){if("none"!=t.getComputedStyle(n).display){for(var o,i,s,a,u,h,p,d,f=c(n),g=l(n),b=!1;!b;){var m=null,y=1==g.nodeType?t.getComputedStyle(g):{};if("none"==y.display)return;if(g==this.root||g==e?(b=!0,m=r):g!=e.body&&g!=e.documentElement&&"visible"!=y.overflow&&(m=c(g)),m&&(o=m,i=f,s=void 0,a=void 0,u=void 0,h=void 0,p=void 0,d=void 0,s=Math.max(o.top,i.top),a=Math.min(o.bottom,i.bottom),u=Math.max(o.left,i.left),h=Math.min(o.right,i.right),d=a-s,!(f=(p=h-u)>=0&&d>=0&&{top:s,bottom:a,left:u,right:h,width:p,height:d})))break;g=l(g)}return f}},o.prototype._getRootRect=function(){var t;if(this.root)t=c(this.root);else{var n=e.documentElement,r=e.body;t={top:0,left:0,right:n.clientWidth||r.clientWidth,width:n.clientWidth||r.clientWidth,bottom:n.clientHeight||r.clientHeight,height:n.clientHeight||r.clientHeight}}return this._expandRectByRootMargin(t)},o.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map((function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100})),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},o.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,r=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==r)for(var o=0;o<this.thresholds.length;o++){var i=this.thresholds[o];if(i==n||i==r||i<n!=i<r)return!0}},o.prototype._rootIsInDom=function(){return!this.root||a(e,this.root)},o.prototype._rootContainsTarget=function(t){return a(this.root||e,t)},o.prototype._registerInstance=function(){n.indexOf(this)<0&&n.push(this)},o.prototype._unregisterInstance=function(){var t=n.indexOf(this);-1!=t&&n.splice(t,1)},t.IntersectionObserver=o,t.IntersectionObserverEntry=r}function r(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,r=this.intersectionRect,o=r.width*r.height;this.intersectionRatio=n?Number((o/n).toFixed(4)):this.isIntersecting?1:0}function o(t,e){var n,r,o,i=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(i.root&&1!=i.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(n=this._checkForIntersections.bind(this),r=this.THROTTLE_TIMEOUT,o=null,function(){o||(o=setTimeout((function(){n(),o=null}),r))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(i.rootMargin),this.thresholds=this._initThresholds(i.threshold),this.root=i.root||null,this.rootMargin=this._rootMarginValues.map((function(t){return t.value+t.unit})).join(" ")}function i(t,e,n,r){"function"==typeof t.addEventListener?t.addEventListener(e,n,r||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function s(t,e,n,r){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,r||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function c(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function a(t,e){for(var n=e;n;){if(n==t)return!0;n=l(n)}return!1}function l(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}}(window,document)},190:function(t,e,n){"use strict";n.d(e,"a",(function(){return y}));var r=n(6),o=n(4),i=n(1),s=n(0),c=n(3),a=n(71),l=n(51),u=n(30),h=n(46),p=n.n(h),d=n(16);n(189);function f(){const t=Object(l.a)(["query RelationshipSelect($search: String!, $skip: Int!) {","","}"]);return f=function(){return t},t}function g(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function b(){const t=Object(l.a)(["query RelationshipSelectMore($search: String!, $skip: Int!) {","}"]);return b=function(){return t},t}const m=Object(s.forwardRef)((t,e)=>{let{data:n,loading:l,value:u,refList:h,canRead:f,isMulti:m,search:y,autoFocus:v,serverErrors:O,onChange:_,htmlID:j,setSearch:I,selectProps:E,fetchMore:R}=t;const w=n&&n[h.gqlNames.listQueryName]?n[h.gqlNames.listQueryName].map(t=>({value:t,label:t._label_})):[],M=O&&O.find(t=>t instanceof Error&&"AccessDeniedError"===t.name);let x=null;const T=t=>"string"==typeof t?w.find(e=>e.value.id===t)||{label:t,value:t}:{label:t._label_,value:t};null!==u&&f&&(m?x=(Array.isArray(u)?u:[]).map(T):u&&(x=T(u)));const C=n&&n[h.gqlNames.listQueryMetaName]?n[h.gqlNames.listQueryMetaName].count:0,k=Object(s.useMemo)(()=>({MenuList:t=>{let{children:e}=t,n=Object(o.a)(t,["children"]);const c=Object(s.useRef)(null);return function(t,e){Object(s.useEffect)(()=>{let n=new IntersectionObserver(t,{}),r=e.current;if(null!==r)return n.observe(r),()=>n.unobserve(r)})}(t=>{let[{isIntersecting:e}]=t;!n.isLoading&&e&&n.options.length<C&&R({query:p()(b(),h.buildQuery(h.gqlNames.listQueryName,"(first: ".concat(50,", search: $search, skip: $skip)"))),variables:{search:y,skip:n.options.length},updateQuery:(t,e)=>{let{fetchMoreResult:n}=e;return n?function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?g(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},t,{[h.gqlNames.listQueryName]:[...t[h.gqlNames.listQueryName],...n[h.gqlNames.listQueryName]]}):t}})},c),Object(i.jsx)(d.z.MenuList,n,e,Object(i.jsx)("div",{css:{textAlign:"center"},ref:c},n.options.length<C&&Object(i.jsx)("span",{css:{padding:8}},"Loading...")))}}),[C,h.gqlNames.listQueryName]);return Object(i.jsx)(a.a,Object(c.a)({onInputChange:t=>I(t),isLoading:l,autoFocus:v,isMulti:m,components:k,getOptionValue:t=>t.value.id,value:x,placeholder:f?void 0:M&&M.message,options:w,onChange:_,id:"react-select-".concat(j),isClearable:!0,instanceId:j,inputId:j,innerRef:e,menuPortalTarget:document.body},E))}),y=t=>{let{innerRef:e,autoFocus:n,field:r,errors:o,renderContext:c,htmlID:a,onChange:l,isMulti:h,value:d}=t;const[g,b]=Object(s.useState)(""),y=r.getRefList(),v=p()(f(),y.buildQuery(y.gqlNames.listQueryName,"(first: ".concat(10,", search: $search, skip: $skip)")),y.countQuery("(search: $search)")),O=!o||o.every(t=>!(t instanceof Error&&"AccessDeniedError"===t.name)),_="dialog"===c?{menuShouldBlockScroll:!0}:null,{data:j,error:I,loading:E,fetchMore:R}=Object(u.b)(v,{variables:{search:g,skip:0}});return I?(console.log("ERROR!!!",I),"Error"):Object(i.jsx)(m,{data:j,loading:E,value:d,refList:y,canRead:O,isMulti:h,search:g,autoFocus:n,serverErrors:o,onChange:l,htmlID:a,setSearch:b,selectProps:_,fetchMore:R,ref:e})}},214:function(t,e,n){"use strict";n.r(e);var r=n(6),o=(n(4),n(1)),i=n(69),s=n(0),c=(n(3),n(71),n(2)),a=n(51),l=n(30),u=n(46),h=n.n(u),p=n(12),d=n(11),f=n(49),g=(n(189),n(190));function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function m(){const t=Object(a.a)(["\n    query User {\n      "," {\n        _label_\n        id\n      }\n    }\n  "]);return m=function(){return t},t}function y(t){let{listKey:e,value:n,onAddUser:r,many:i}=t;const s="authenticated"+e,{data:a}=Object(l.b)(h()(m(),s));if(a&&a[s]){const t=a[s].id;if(null!==n&&(i?n.some(e=>e.id===t):n.id===t))return null;const e="".concat(i?"Add":"Set as"," ").concat(a[s]._label_);return Object(o.jsx)(f.a,{placement:"top",content:e},t=>Object(o.jsx)(d.b,{css:{marginLeft:c.d},variant:"ghost",ref:t,onClick:()=>{r(a[s])},icon:p.r,"aria-label":e}))}return null}function v(t){let{field:e,value:n}=t;const{many:r,ref:i}=e.config,{adminPath:s,getListByKey:a}=e.adminMeta,l=a(i);let u,h=!1,g="".concat(s,"/").concat(l.path);return r?(u="View List of Related Items",n.length||(h=!0),g="".concat(g,'?!id_in="').concat(n.slice(0,100).map(t=>{let{id:e}=t;return e}).join(","),'"')):(u="View Item Details",n?g="".concat(g,"/").concat(n.id):h=!0),Object(o.jsx)(f.a,{placement:"top",content:u},t=>Object(o.jsx)(d.b,{ref:t,icon:p.m,"aria-label":u,variant:"ghost",css:{marginLeft:c.d},target:"_blank",to:g,isDisabled:h}))}function O(t){let e,{field:n,item:i,list:a,onCreate:l,CreateItemModal:u}=t,h=n.adminMeta.getListByKey(n.config.ref),[g,m]=Object(s.useState)(!1),y="Create and add ".concat(h.singular);return i&&i.id&&(e=h.fields.filter(t=>"Relationship"===t.type&&t.config.ref===a.key&&t.config.refFieldPath===n.path).reduce((t,e)=>{const n={_label_:i._label_||"<link to parent>",id:i.id};return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},t,{[e.path]:e.config.many?[n]:n})},{})),Object(o.jsx)(s.Fragment,null,Object(o.jsx)(f.a,{placement:"top",content:y},t=>Object(o.jsx)(d.b,{ref:t,onClick:()=>{m(!0)},icon:p.s,"aria-label":y,variant:"ghost",css:{marginLeft:c.d}})),Object(o.jsx)(u,{isOpen:g,list:h,prefillData:e,onClose:()=>{m(!1)},onCreate:t=>{let{data:e}=t;m(!1),console.log(e),l(e[h.gqlNames.createMutationName])}}))}class _ extends s.Component{constructor(){super(...arguments),Object(r.a)(this,"onChange",t=>{const{field:e,onChange:n}=this.props,{many:r}=e.config;n(r?t.map(t=>t.value):t?t.value:null)})}render(){const{autoFocus:t,field:e,value:n,renderContext:r,errors:s,onChange:c,item:a,list:l,CreateItemModal:u}=this.props,{many:h,ref:p}=e.config,{authStrategy:d}=e.adminMeta,f="ks-input-".concat(e.path);return Object(o.jsx)(i.a,null,Object(o.jsx)(i.c,{htmlFor:f,field:e,errors:s}),Object(o.jsx)(i.b,null,Object(o.jsx)("div",{css:{flex:1}},Object(o.jsx)(g.a,{autoFocus:t,isMulti:h,field:e,value:n,errors:s,renderContext:r,htmlID:f,onChange:this.onChange})),Object(o.jsx)(O,{onCreate:t=>{c(h?(n||[]).concat(t):t)},field:e,item:a,list:l,CreateItemModal:u}),d&&p===d.listKey&&Object(o.jsx)(y,{many:h,onAddUser:t=>{c(h?(n||[]).concat(t):t)},value:n,listKey:d.listKey}),Object(o.jsx)(v,{field:e,value:n})))}}e.default=_}}]);