this.wc=this.wc||{},this.wc.wcSharedContext=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=31)}({10:function(e,t,n){e.exports=n(26)()},18:function(e,t,n){var r;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var a=typeof r;if("string"===a||"number"===a)e.push(r);else if(Array.isArray(r)&&r.length){var u=o.apply(null,r);u&&e.push(u)}else if("object"===a)for(var i in r)n.call(r,i)&&r[i]&&e.push(i)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()},26:function(e,t,n){"use strict";var r=n(27);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,a,u){if(u!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return n.PropTypes=n,n}},27:function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},3:function(e,t){!function(){e.exports=this.wp.element}()},31:function(e,t,n){"use strict";n.r(t),n.d(t,"useInnerBlockLayoutContext",(function(){return s})),n.d(t,"InnerBlockLayoutContextProvider",(function(){return p})),n.d(t,"useProductDataContext",(function(){return f})),n.d(t,"ProductDataContextProvider",(function(){return d}));var r=n(3),o=n(10),a=n.n(o),u=n(18),i=n.n(u),c=Object(r.createContext)({parentName:"",parentClassName:"",isLoading:!1}),s=function(){return Object(r.useContext)(c)},p=function(e){var t=e.parentName,n=void 0===t?"":t,o=e.parentClassName,a=void 0===o?"":o,u=e.isLoading,s=void 0!==u&&u,p=e.children,l={parentName:n,parentClassName:a,isLoading:s};return Object(r.createElement)(c.Provider,{value:l},Object(r.createElement)("div",{className:i()("wc-block-layout",{"wc-block-layout--is-loading":s})},p))};p.propTypes={children:a.a.node,parentName:a.a.string,parentClassName:a.a.string};var l=Object(r.createContext)({product:null}),f=function(){return Object(r.useContext)(l)},d=function(e){var t=e.product,n=void 0===t?null:t,o=e.children,a={product:n};return Object(r.createElement)(l.Provider,{value:a},o)};d.propTypes={children:a.a.node,product:a.a.object}}});
 