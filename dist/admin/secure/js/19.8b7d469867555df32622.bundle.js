(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{218:function(e,t,n){"use strict";n.r(t);var a=n(6),o=n(69),r=n(0),s=n.n(r),c=n(61);class u extends r.Component{constructor(){super(...arguments),Object(a.a)(this,"onChange",e=>{const t=e.target.value;/^-?\d*\.?\d*$/.test(t)&&this.props.onChange(t)})}render(){const{autoFocus:e,field:t,value:n,errors:a}=this.props,r="ks-input-".concat(t.path);return s.a.createElement(o.a,null,s.a.createElement(o.c,{htmlFor:r,field:t,errors:a}),s.a.createElement(o.b,null,s.a.createElement(c.c,{autoComplete:"off",autoFocus:e,type:"text",value:n,onChange:this.onChange,id:r})))}}t.default=u}}]);