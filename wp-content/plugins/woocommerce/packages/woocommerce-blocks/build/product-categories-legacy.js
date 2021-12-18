this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["product-categories"]=function(e){function t(t){for(var r,a,l=t[0],i=t[1],s=t[2],b=0,p=[];b<l.length;b++)a=l[b],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&p.push(n[a][0]),n[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(u&&u(t);p.length;)p.shift()();return c.push.apply(c,s||[]),o()}function o(){for(var e,t=0;t<c.length;t++){for(var o=c[t],r=!0,l=1;l<o.length;l++){var i=o[l];0!==n[i]&&(r=!1)}r&&(c.splice(t--,1),e=a(a.s=o[0]))}return e}var r={},n={12:0},c=[];function a(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=r,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(o,r,function(t){return e[t]}.bind(null,r));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var l=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var u=i;return c.push([619,2,0,1]),o()}({0:function(e,t){!function(){e.exports=this.wp.element}()},1:function(e,t){!function(){e.exports=this.wp.i18n}()},11:function(e,t){!function(){e.exports=this.React}()},15:function(e,t){!function(){e.exports=this.wp.blocks}()},22:function(e,t){!function(){e.exports=this.wp.compose}()},23:function(e,t){!function(){e.exports=this.wp.blockEditor}()},39:function(e,t){!function(){e.exports=this.wp.editor}()},4:function(e,t){!function(){e.exports=this.wp.components}()},5:function(e,t){!function(){e.exports=this.lodash}()},595:function(e,t,o){},619:function(e,t,o){"use strict";o.r(t);var r=o(16),n=o.n(r),c=o(0),a=o(1),l=o(15),i=o(63),s=o(633),u=Object(c.createElement)(s.a,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 24 24"},Object(c.createElement)("path",{fill:"none",d:"M0 0h24v24H0V0z"}),Object(c.createElement)("path",{d:"M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20.1 3H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM19 19H5V5h14v14z"})),b=(o(595),o(596),o(11)),p=o(23),d=o(39),h=(o(2),o(4)),g=o(89),f=function(){return Object(c.createElement)(h.Placeholder,{icon:Object(c.createElement)(i.a,{srcElement:u}),label:Object(a.__)("Product Categories List",'woocommerce'),className:"wc-block-product-categories"},Object(a.__)("This block shows product categories for your store. To use it, you'll first need to create a product and assign it to a category.",'woocommerce'))},m=function(e){var t,o,r,n,l,i=e.attributes,s=e.setAttributes,u=e.name;return Object(c.createElement)(b.Fragment,null,(t=i.hasCount,o=i.hasImage,r=i.hasEmpty,n=i.isDropdown,l=i.isHierarchical,Object(c.createElement)(p.InspectorControls,{key:"inspector"},Object(c.createElement)(h.PanelBody,{title:Object(a.__)("List Settings",'woocommerce'),initialOpen:!0},Object(c.createElement)(g.a,{label:Object(a.__)("Display style",'woocommerce'),value:n?"dropdown":"list",options:[{label:Object(a.__)("List",'woocommerce'),value:"list"},{label:Object(a.__)("Dropdown",'woocommerce'),value:"dropdown"}],onChange:function(e){return s({isDropdown:"dropdown"===e})}})),Object(c.createElement)(h.PanelBody,{title:Object(a.__)("Content",'woocommerce'),initialOpen:!0},Object(c.createElement)(h.ToggleControl,{label:Object(a.__)("Show product count",'woocommerce'),help:t?Object(a.__)("Product count is visible.",'woocommerce'):Object(a.__)("Product count is hidden.",'woocommerce'),checked:t,onChange:function(){return s({hasCount:!t})}}),!n&&Object(c.createElement)(h.ToggleControl,{label:Object(a.__)("Show category images",'woocommerce'),help:o?Object(a.__)("Category images are visible.",'woocommerce'):Object(a.__)("Category images are hidden.",'woocommerce'),checked:o,onChange:function(){return s({hasImage:!o})}}),Object(c.createElement)(h.ToggleControl,{label:Object(a.__)("Show hierarchy",'woocommerce'),help:l?Object(a.__)("Hierarchy is visible.",'woocommerce'):Object(a.__)("Hierarchy is hidden.",'woocommerce'),checked:l,onChange:function(){return s({isHierarchical:!l})}}),Object(c.createElement)(h.ToggleControl,{label:Object(a.__)("Show empty categories",'woocommerce'),help:r?Object(a.__)("Empty categories are visible.",'woocommerce'):Object(a.__)("Empty categories are hidden.",'woocommerce'),checked:r,onChange:function(){return s({hasEmpty:!r})}})))),Object(c.createElement)(d.ServerSideRender,{block:u,attributes:i,EmptyResponsePlaceholder:f}))};Object(l.registerBlockType)("woocommerce/product-categories",{title:Object(a.__)("Product Categories List",'woocommerce'),icon:{src:Object(c.createElement)(i.a,{srcElement:u}),foreground:"#96588a"},category:"woocommerce",keywords:[Object(a.__)("WooCommerce",'woocommerce')],description:Object(a.__)("Show all product categories as a list or dropdown.",'woocommerce'),supports:{align:["wide","full"],html:!1},example:{attributes:{hasCount:!0,hasImage:!1}},attributes:{hasCount:{type:"boolean",default:!0},hasImage:{type:"boolean",default:!1},hasEmpty:{type:"boolean",default:!1},isDropdown:{type:"boolean",default:!1},isHierarchical:{type:"boolean",default:!0}},deprecated:[{attributes:{hasCount:{type:"boolean",default:!0,source:"attribute",selector:"div",attribute:"data-has-count"},hasEmpty:{type:"boolean",default:!1,source:"attribute",selector:"div",attribute:"data-has-empty"},isDropdown:{type:"boolean",default:!1,source:"attribute",selector:"div",attribute:"data-is-dropdown"},isHierarchical:{type:"boolean",default:!0,source:"attribute",selector:"div",attribute:"data-is-hierarchical"}},migrate:function(e){return e},save:function(e){var t=e.attributes,o=t.hasCount,r=t.hasEmpty,a=t.isDropdown,l=t.isHierarchical,i={};return o&&(i["data-has-count"]=!0),r&&(i["data-has-empty"]=!0),a&&(i["data-is-dropdown"]=!0),l&&(i["data-is-hierarchical"]=!0),Object(c.createElement)("div",n()({className:"is-loading"},i),a?Object(c.createElement)("span",{"aria-hidden":!0,className:"wc-block-product-categories__placeholder"}):Object(c.createElement)("ul",{"aria-hidden":!0},Object(c.createElement)("li",null,Object(c.createElement)("span",{className:"wc-block-product-categories__placeholder"})),Object(c.createElement)("li",null,Object(c.createElement)("span",{className:"wc-block-product-categories__placeholder"})),Object(c.createElement)("li",null,Object(c.createElement)("span",{className:"wc-block-product-categories__placeholder"}))))}}],edit:function(e){return Object(c.createElement)(m,e)},save:function(){return null}})},63:function(e,t,o){"use strict";var r=o(8),n=o.n(r),c=o(37),a=o.n(c),l=o(11);o(2);function i(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}t.a=function(e){var t=e.srcElement,o=e.size,r=void 0===o?24:o,c=a()(e,["srcElement","size"]);return Object(l.isValidElement)(t)&&Object(l.cloneElement)(t,function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?i(Object(o),!0).forEach((function(t){n()(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({width:r,height:r},c))}},89:function(e,t,o){"use strict";var r=o(16),n=o.n(r),c=o(18),a=o.n(c),l=o(19),i=o.n(l),s=o(17),u=o.n(s),b=o(20),p=o.n(b),d=o(21),h=o.n(d),g=o(10),f=o.n(g),m=o(0),O=o(5),w=o(7),j=o.n(w),y=o(4),v=o(22);o(161);function _(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var o,r=f()(e);if(t){var n=f()(this).constructor;o=Reflect.construct(r,arguments,n)}else o=r.apply(this,arguments);return h()(this,o)}}var k=function(e){p()(o,e);var t=_(o);function o(){var e;return a()(this,o),(e=t.apply(this,arguments)).onClick=e.onClick.bind(u()(e)),e}return i()(o,[{key:"onClick",value:function(e){this.props.onChange&&this.props.onChange(e.target.value)}},{key:"render",value:function(){var e,t=this,o=this.props,r=o.label,c=o.checked,a=o.instanceId,l=o.className,i=o.help,s=o.options,u=o.value,b="inspector-toggle-button-control-".concat(a);return i&&(e=Object(O.isFunction)(i)?i(c):i),Object(m.createElement)(y.BaseControl,{id:b,help:e,className:j()("components-toggle-button-control",l)},Object(m.createElement)("label",{id:b+"__label",htmlFor:b,className:"components-toggle-button-control__label"},r),Object(m.createElement)(y.ButtonGroup,{"aria-labelledby":b+"__label"},s.map((function(e,o){var c={};return u===e.value?(c.isPrimary=!0,c["aria-pressed"]=!0):(c.isDefault=!0,c["aria-pressed"]=!1),Object(m.createElement)(y.Button,n()({key:"".concat(e.label,"-").concat(e.value,"-").concat(o),value:e.value,onClick:t.onClick,"aria-label":r+": "+e.label},c),e.label)}))))}}]),o}(m.Component);t.a=Object(v.withInstanceId)(k)}});
 