this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["featured-category"]=function(e){function t(t){for(var r,a,i=t[0],u=t[1],s=t[2],g=0,d=[];g<i.length;g++)a=i[g],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(l&&l(t);d.length;)d.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,i=1;i<n.length;i++){var u=n[i];0!==o[u]&&(r=!1)}r&&(c.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={8:0},c=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var i=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var l=u;return c.push([608,2,0,1]),n()}({0:function(e,t){!function(){e.exports=this.wp.element}()},1:function(e,t){!function(){e.exports=this.wp.i18n}()},11:function(e,t){!function(){e.exports=this.React}()},12:function(e,t){!function(){e.exports=this.wp.url}()},13:function(e,t){!function(){e.exports=this.regeneratorRuntime}()},14:function(e,t){!function(){e.exports=this.moment}()},15:function(e,t){!function(){e.exports=this.wp.blocks}()},22:function(e,t){!function(){e.exports=this.wp.compose}()},23:function(e,t){!function(){e.exports=this.wp.blockEditor}()},26:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(13),o=n.n(r),c=n(24),a=n.n(c),i=function(){var e=a()(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("function"!=typeof t.json){e.next=11;break}return e.prev=1,e.next=4,t.json();case 4:return n=e.sent,e.abrupt("return",{message:n.message,type:n.type||"api"});case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",{message:e.t0.message,type:"general"});case 11:return e.abrupt("return",{message:t.message,type:t.type||"general"});case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},27:function(e,t,n){"use strict";n.d(t,"g",(function(){return d})),n.d(t,"d",(function(){return b})),n.d(t,"a",(function(){return p})),n.d(t,"h",(function(){return f})),n.d(t,"e",(function(){return m})),n.d(t,"b",(function(){return h})),n.d(t,"c",(function(){return O})),n.d(t,"f",(function(){return j}));var r=n(8),o=n.n(r),c=n(12),a=n(9),i=n.n(a),u=n(5),s=n(6);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d=function(e){var t=e.selected,n=void 0===t?[]:t,r=e.search,o=void 0===r?"":r,a=e.queryArgs,l=function(e){var t=e.selected,n=void 0===t?[]:t,r=e.search,o=void 0===r?"":r,a=e.queryArgs,i=void 0===a?[]:a,u={per_page:s.f?100:0,catalog_visibility:"any",search:o,orderby:"title",order:"asc"},l=[Object(c.addQueryArgs)("/wc/store/products",g(g({},u),i))];return s.f&&n.length&&l.push(Object(c.addQueryArgs)("/wc/store/products",{catalog_visibility:"any",include:n})),l}({selected:n,search:o,queryArgs:void 0===a?[]:a});return Promise.all(l.map((function(e){return i()({path:e})}))).then((function(e){return Object(u.uniqBy)(Object(u.flatten)(e),"id").map((function(e){return g(g({},e),{},{parent:0})}))})).catch((function(e){throw e}))},b=function(e){return i()({path:"/wc/store/products/".concat(e)})},p=function(){return i()({path:"wc/store/products/attributes"})},f=function(e){return i()({path:"wc/store/products/attributes/".concat(e,"/terms")})},m=function(e){var t=e.selected,n=function(e){var t=e.selected,n=void 0===t?[]:t,r=e.search,o=[Object(c.addQueryArgs)("wc/store/products/tags",{per_page:s.g?100:0,orderby:s.g?"count":"name",order:s.g?"desc":"asc",search:r})];return s.g&&n.length&&o.push(Object(c.addQueryArgs)("wc/store/products/tags",{include:n})),o}({selected:void 0===t?[]:t,search:e.search});return Promise.all(n.map((function(e){return i()({path:e})}))).then((function(e){return Object(u.uniqBy)(Object(u.flatten)(e),"id")}))},h=function(e){return i()({path:Object(c.addQueryArgs)("wc/store/products/categories",g({per_page:0},e))})},O=function(e){return i()({path:"wc/store/products/categories/".concat(e)})},j=function(e){return i()({path:Object(c.addQueryArgs)("wc/store/products",{per_page:0,type:"variation",parent:e})})}},28:function(e,t){!function(){e.exports=this.wp.escapeHtml}()},3:function(e,t){!function(){e.exports=this.wc.wcSettings}()},30:function(e,t,n){"use strict";var r=n(0),o=n(1),c=(n(2),n(28));t.a=function(e){var t,n,a,i=e.error;return Object(r.createElement)("div",{className:"wc-block-error-message"},(n=(t=i).message,a=t.type,n?"general"===a?Object(r.createElement)("span",null,Object(o.__)("The following error was returned",'woocommerce'),Object(r.createElement)("br",null),Object(r.createElement)("code",null,Object(c.escapeHTML)(n))):"api"===a?Object(r.createElement)("span",null,Object(o.__)("The following error was returned from the API",'woocommerce'),Object(r.createElement)("br",null),Object(r.createElement)("code",null,Object(c.escapeHTML)(n))):n:Object(o.__)("An unknown error occurred which prevented the block from being updated.",'woocommerce')))}},36:function(e,t){!function(){e.exports=this.wp.keycodes}()},4:function(e,t){!function(){e.exports=this.wp.components}()},45:function(e,t,n){"use strict";var r=n(16),o=n.n(r),c=n(0),a=n(1),i=n(5),u=(n(2),n(31)),s=n(4),l=n(13),g=n.n(l),d=n(24),b=n.n(d),p=n(18),f=n.n(p),m=n(19),h=n.n(m),O=n(17),j=n.n(O),y=n(20),w=n.n(y),v=n(21),k=n.n(v),_=n(10),S=n.n(_),E=n(22),C=n(27),x=n(26);function P(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=S()(e);if(t){var o=S()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return k()(this,n)}}var R=Object(E.createHigherOrderComponent)((function(e){return function(t){w()(r,t);var n=P(r);function r(){var e;return f()(this,r),(e=n.apply(this,arguments)).state={error:null,loading:!1,categories:null},e.loadCategories=e.loadCategories.bind(j()(e)),e}return h()(r,[{key:"componentDidMount",value:function(){this.loadCategories()}},{key:"loadCategories",value:function(){var e=this;this.setState({loading:!0}),Object(C.b)().then((function(t){e.setState({categories:t,loading:!1,error:null})})).catch(function(){var t=b()(g.a.mark((function t(n){var r;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(x.a)(n);case 2:r=t.sent,e.setState({categories:null,loading:!1,error:r});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},{key:"render",value:function(){var t=this.state,n=t.error,r=t.loading,a=t.categories;return Object(c.createElement)(e,o()({},this.props,{error:n,isLoading:r,categories:a}))}}]),r}(c.Component)}),"withCategories"),I=n(30),T=(n(109),function(e){var t=e.categories,n=e.error,r=e.isLoading,l=e.onChange,g=e.onOperatorChange,d=e.operator,b=e.selected,p=e.isSingle,f=e.showReviewCount,m={clear:Object(a.__)("Clear all product categories",'woocommerce'),list:Object(a.__)("Product Categories",'woocommerce'),noItems:Object(a.__)("Your store doesn't have any product categories.",'woocommerce'),search:Object(a.__)("Search for product categories",'woocommerce'),selected:function(e){return Object(a.sprintf)(Object(a._n)("%d category selected","%d categories selected",e,'woocommerce'),e)},updated:Object(a.__)("Category search results updated.",'woocommerce')};return n?Object(c.createElement)(I.a,{error:n}):Object(c.createElement)(c.Fragment,null,Object(c.createElement)(u.a,{className:"woocommerce-product-categories",list:t,isLoading:r,selected:b.map((function(e){return Object(i.find)(t,{id:e})})).filter(Boolean),onChange:l,renderItem:function(e){var t=e.item,n=e.search,r=e.depth,i=void 0===r?0:r,s=["woocommerce-product-categories__item"];n.length&&s.push("is-searching"),0===i&&0!==t.parent&&s.push("is-skip-level");var l=t.breadcrumbs.length?"".concat(t.breadcrumbs.join(", "),", ").concat(t.name):t.name,g=f?Object(a.sprintf)(Object(a._n)("%s, has %d review","%s, has %d reviews",t.review_count,'woocommerce'),l,t.review_count):Object(a.sprintf)(Object(a._n)("%s, has %d product","%s, has %d products",t.count,'woocommerce'),l,t.count),d=f?Object(a.sprintf)(Object(a._n)("%d Review","%d Reviews",t.review_count,'woocommerce'),t.review_count):Object(a.sprintf)(Object(a._n)("%d Product","%d Products",t.count,'woocommerce'),t.count);return Object(c.createElement)(u.b,o()({className:s.join(" ")},e,{showCount:!0,countLabel:d,"aria-label":g}))},messages:m,isHierarchical:!0,isSingle:p}),!!g&&Object(c.createElement)("div",{className:b.length<2?"screen-reader-text":""},Object(c.createElement)(s.SelectControl,{className:"woocommerce-product-categories__operator",label:Object(a.__)("Display products matching",'woocommerce'),help:Object(a.__)("Pick at least two categories to use this setting.",'woocommerce'),value:d,onChange:g,options:[{label:Object(a.__)("Any selected categories",'woocommerce'),value:"any"},{label:Object(a.__)("All selected categories",'woocommerce'),value:"all"}]})))});T.defaultProps={operator:"any",isSingle:!1};t.a=R(T)},48:function(e,t){!function(){e.exports=this.ReactDOM}()},5:function(e,t){!function(){e.exports=this.lodash}()},51:function(e,t){!function(){e.exports=this.wp.viewport}()},56:function(e,t){!function(){e.exports=this.wp.hooks}()},57:function(e,t,n){"use strict";var r=n(0),o=n(1),c=(n(2),n(63)),a=n(633),i=Object(r.createElement)(a.a,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(r.createElement)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"})),u=n(7),s=n.n(u),l=n(4),g=n(30);n(98),t.a=function(e){var t=e.className,n=e.error,a=e.isLoading,u=e.onRetry;return Object(r.createElement)(l.Placeholder,{icon:Object(r.createElement)(c.a,{srcElement:i}),label:Object(o.__)("Sorry, an error occurred",'woocommerce'),className:s()("wc-block-api-error",t)},Object(r.createElement)(g.a,{error:n}),u&&Object(r.createElement)(r.Fragment,null,a?Object(r.createElement)(l.Spinner,null):Object(r.createElement)(l.Button,{isDefault:!0,onClick:u},Object(o.__)("Retry",'woocommerce'))))}},6:function(e,t,n){"use strict";n.d(t,"m",(function(){return o})),n.d(t,"n",(function(){return c})),n.d(t,"h",(function(){return a})),n.d(t,"j",(function(){return i})),n.d(t,"a",(function(){return u})),n.d(t,"i",(function(){return s})),n.d(t,"l",(function(){return l})),n.d(t,"c",(function(){return g})),n.d(t,"k",(function(){return d})),n.d(t,"b",(function(){return b})),n.d(t,"f",(function(){return p})),n.d(t,"g",(function(){return f})),n.d(t,"d",(function(){return m})),n.d(t,"e",(function(){return h})),n.d(t,"o",(function(){return O}));var r=n(3),o=(Object(r.getSetting)("currentUserIsAdmin",!1),Object(r.getSetting)("reviewRatingsEnabled",!0)),c=Object(r.getSetting)("showAvatars",!0),a=Object(r.getSetting)("max_columns",6),i=Object(r.getSetting)("min_columns",1),u=Object(r.getSetting)("default_columns",3),s=Object(r.getSetting)("max_rows",6),l=Object(r.getSetting)("min_rows",1),g=Object(r.getSetting)("default_rows",3),d=Object(r.getSetting)("min_height",500),b=Object(r.getSetting)("default_height",500),p=(Object(r.getSetting)("placeholderImgSrc",""),Object(r.getSetting)("thumbnail_size",300),Object(r.getSetting)("isLargeCatalog")),f=Object(r.getSetting)("limitTags"),m=(Object(r.getSetting)("hasProducts",!0),Object(r.getSetting)("hasTags",!0)),h=Object(r.getSetting)("homeUrl",""),O=(Object(r.getSetting)("couponsEnabled",!0),Object(r.getSetting)("shippingEnabled",!0),Object(r.getSetting)("taxesEnabled",!0),Object(r.getSetting)("displayItemizedTaxes",!1),Object(r.getSetting)("displayShopPricesIncludingTax",!1),Object(r.getSetting)("displayCartPricesIncludingTax",!1),Object(r.getSetting)("productCount",0),Object(r.getSetting)("attributes",[]),Object(r.getSetting)("isShippingCalculatorEnabled",!0),Object(r.getSetting)("isShippingCostHidden",!1),Object(r.getSetting)("woocommerceBlocksPhase",1),Object(r.getSetting)("wcBlocksAssetUrl","")),j=(Object(r.getSetting)("shippingCountries",{}),Object(r.getSetting)("allowedCountries",{}),Object(r.getSetting)("shippingStates",{}),Object(r.getSetting)("allowedStates",{}),Object(r.getSetting)("shippingMethodsExist",!1),Object(r.getSetting)("checkoutShowLoginReminder",!0),{id:0,title:"",permalink:""}),y=Object(r.getSetting)("storePages",{shop:j,cart:j,checkout:j,privacy:j,terms:j});y.shop.permalink,y.checkout.id,y.checkout.permalink,y.privacy.permalink,y.privacy.title,y.terms.permalink,y.terms.title,y.cart.id,y.cart.permalink,Object(r.getSetting)("checkoutAllowsGuest",!1),Object(r.getSetting)("checkoutAllowsSignup",!1),n(15)},606:function(e,t,n){},608:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(1),c=n(23),a=n(15),i=n(6),u=n(63),s=n(633),l=Object(r.createElement)(s.a,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 24 24"},Object(r.createElement)("path",{fill:"none",d:"M0 0h24v24H0V0z"}),Object(r.createElement)("path",{d:"M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-6.92-3.96L12.39 17 15 15.47 17.61 17l-.69-2.96 2.3-1.99-3.03-.26L15 9l-1.19 2.79-3.03.26z"})),g=(n(605),n(606),n(4)),d=n(7),b=n.n(d),p=n(22),f=(n(2),n(45)),m=n(57),h=n(5);function O(e){return e&&Object(h.isObject)(e.image)?e.image.src:""}var j=n(16),y=n.n(j),w=n(13),v=n.n(w),k=n(24),_=n.n(k),S=n(18),E=n.n(S),C=n(19),x=n.n(C),P=n(17),R=n.n(P),I=n(20),T=n.n(I),A=n(21),D=n.n(A),M=n(10),N=n.n(M),B=n(27),L=n(26);function z(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=N()(e);if(t){var o=N()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return D()(this,n)}}var H=Object(p.createHigherOrderComponent)((function(e){return function(t){T()(o,t);var n=z(o);function o(){var e;return E()(this,o),(e=n.apply(this,arguments)).state={error:null,loading:!1,category:"preview"===e.props.attributes.categoryId?e.props.attributes.previewCategory:null},e.loadCategory=e.loadCategory.bind(R()(e)),e}return x()(o,[{key:"componentDidMount",value:function(){this.loadCategory()}},{key:"componentDidUpdate",value:function(e){e.attributes.categoryId!==this.props.attributes.categoryId&&this.loadCategory()}},{key:"loadCategory",value:function(){var e=this,t=this.props.attributes.categoryId;"preview"!==t&&(t?(this.setState({loading:!0}),Object(B.c)(t).then((function(t){e.setState({category:t,loading:!1,error:null})})).catch(function(){var t=_()(v.a.mark((function t(n){var r;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(L.a)(n);case 2:r=t.sent,e.setState({category:null,loading:!1,error:r});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())):this.setState({category:null,loading:!1,error:null}))}},{key:"render",value:function(){var t=this.state,n=t.error,o=t.loading,c=t.category;return Object(r.createElement)(e,y()({},this.props,{error:n,getCategory:this.loadCategory,isLoading:o,category:c}))}}]),o}(r.Component)}),"withCategory"),F=Object(p.compose)([H,Object(c.withColors)({overlayColor:"background-color"}),g.withSpokenMessages])((function(e){var t,n,a,s,d,p,j=e.attributes,y=e.isSelected,w=e.setAttributes,v=e.error,k=e.getCategory,_=e.isLoading,S=e.category,E=e.overlayColor,C=e.setOverlayColor,x=e.debouncedSpeak,P=j.editMode;return v?Object(r.createElement)(m.a,{className:"wc-block-featured-category-error",error:v,isLoading:_,onRetry:k}):P?Object(r.createElement)(g.Placeholder,{icon:Object(r.createElement)(u.a,{srcElement:l}),label:Object(o.__)("Featured Category",'woocommerce'),className:"wc-block-featured-category"},Object(o.__)("Visually highlight a product category and encourage prompt action.",'woocommerce'),Object(r.createElement)("div",{className:"wc-block-featured-category__selection"},Object(r.createElement)(f.a,{selected:[j.categoryId],onChange:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=e[0]?e[0].id:0;w({categoryId:t,mediaId:0,mediaSrc:""})},isSingle:!0}),Object(r.createElement)(g.Button,{isPrimary:!0,onClick:function(){w({editMode:!1}),x(Object(o.__)("Showing Featured Product block preview.",'woocommerce'))}},Object(o.__)("Done",'woocommerce')))):Object(r.createElement)(r.Fragment,null,(d=j.contentAlign,p=j.mediaId||function(e){return e&&Object(h.isObject)(e.image)?e.image.id:0}(S),Object(r.createElement)(c.BlockControls,null,Object(r.createElement)(c.AlignmentToolbar,{value:d,onChange:function(e){w({contentAlign:e})}}),Object(r.createElement)(c.MediaUploadCheck,null,Object(r.createElement)(g.Toolbar,null,Object(r.createElement)(c.MediaUpload,{onSelect:function(e){w({mediaId:e.id,mediaSrc:e.url})},allowedTypes:["image"],value:p,render:function(e){var t=e.open;return Object(r.createElement)(g.IconButton,{className:"components-toolbar__control",label:Object(o.__)("Edit media"),icon:"format-image",onClick:t,disabled:!S})}}))))),(t=j.mediaSrc||O(S),n=j.focalPoint,a=void 0===n?{x:.5,y:.5}:n,s="function"==typeof g.FocalPointPicker,Object(r.createElement)(c.InspectorControls,{key:"inspector"},Object(r.createElement)(g.PanelBody,{title:Object(o.__)("Content",'woocommerce')},Object(r.createElement)(g.ToggleControl,{label:Object(o.__)("Show description",'woocommerce'),checked:j.showDesc,onChange:function(){return w({showDesc:!j.showDesc})}})),Object(r.createElement)(c.PanelColorSettings,{title:Object(o.__)("Overlay",'woocommerce'),colorSettings:[{value:E.color,onChange:C,label:Object(o.__)("Overlay Color",'woocommerce')}]},!!t&&Object(r.createElement)(r.Fragment,null,Object(r.createElement)(g.RangeControl,{label:Object(o.__)("Background Opacity",'woocommerce'),value:j.dimRatio,onChange:function(e){return w({dimRatio:e})},min:0,max:100,step:10}),s&&Object(r.createElement)(g.FocalPointPicker,{label:Object(o.__)("Focal Point Picker"),url:t,value:a,onChange:function(e){return w({focalPoint:e})}}))))),S?function(){var e,t,n=j.className,a=j.contentAlign,u=j.dimRatio,s=j.focalPoint,l=j.height,d=j.showDesc,p=b()("wc-block-featured-category",{"is-selected":y&&"preview"!==j.productId,"is-loading":!S&&_,"is-not-found":!S&&!_,"has-background-dim":0!==u},0===(e=u)||50===e?null:"has-background-dim-".concat(10*Math.round(e/10)),"center"!==a&&"has-".concat(a,"-content"),n),f=j.mediaSrc||O(S),m=S?(t=f)?{backgroundImage:"url(".concat(t,")")}:{}:{};if(E.color&&(m.backgroundColor=E.color),s){var h=100*s.x,v=100*s.y;m.backgroundPosition="".concat(h,"% ").concat(v,"%")}var k;return Object(r.createElement)(g.ResizableBox,{className:p,size:{height:l},minHeight:i.k,enable:{bottom:!0},onResizeStop:function(e,t,n){w({height:parseInt(n.style.height,10)})},style:m},Object(r.createElement)("div",{className:"wc-block-featured-category__wrapper"},Object(r.createElement)("h2",{className:"wc-block-featured-category__title",dangerouslySetInnerHTML:{__html:S.name}}),d&&Object(r.createElement)("div",{className:"wc-block-featured-category__description",dangerouslySetInnerHTML:{__html:S.description}}),Object(r.createElement)("div",{className:"wc-block-featured-category__link"},(k=b()("wp-block-button__link","is-style-fill"),"preview"===j.categoryId?Object(r.createElement)("div",{className:"wp-block-button aligncenter",style:{width:"100%"}},Object(r.createElement)(c.RichText.Content,{tagName:"a",className:k,href:S.permalink,title:j.linkText,style:{backgroundColor:"vivid-green-cyan",borderRadius:"5px"},value:j.linkText,target:S.permalink})):Object(r.createElement)(c.InnerBlocks,{template:[["core/button",{text:Object(o.__)("Shop now",'woocommerce'),url:S.permalink,align:"center"}]],templateLock:"all"})))))}():Object(r.createElement)(g.Placeholder,{className:"wc-block-featured-category",icon:Object(r.createElement)(u.a,{srcElement:l}),label:Object(o.__)("Featured Category",'woocommerce')},_?Object(r.createElement)(g.Spinner,null):Object(o.__)("No product category is selected.",'woocommerce')))})),V=[{id:1,name:Object(o.__)("Clothing",'woocommerce'),slug:"clothing",parent:0,count:10,description:"<p>".concat(Object(o.__)("Branded t-shirts, jumpers, pants and more!",'woocommerce'),"</p>\n"),image:{id:1,date_created:"2019-07-15T17:05:04",date_created_gmt:"2019-07-15T17:05:04",date_modified:"2019-07-15T17:05:04",date_modified_gmt:"2019-07-15T17:05:04",src:i.o+"img/collection.jpg",name:"",alt:""},permalink:"#"}],Q={attributes:{contentAlign:"center",dimRatio:50,editMode:!1,height:i.b,mediaSrc:"",showDesc:!0,categoryId:"preview",previewCategory:V[0]}};Object(a.registerBlockType)("woocommerce/featured-category",{title:Object(o.__)("Featured Category",'woocommerce'),icon:{src:Object(r.createElement)(u.a,{srcElement:l}),foreground:"#96588a"},category:"woocommerce",keywords:[Object(o.__)("WooCommerce",'woocommerce')],description:Object(o.__)("Visually highlight a product category and encourage prompt action.",'woocommerce'),supports:{align:["wide","full"],html:!1},example:Q,attributes:{contentAlign:{type:"string",default:"center"},dimRatio:{type:"number",default:50},editMode:{type:"boolean",default:!0},focalPoint:{type:"object"},height:{type:"number",default:i.b},mediaId:{type:"number",default:0},mediaSrc:{type:"string",default:""},overlayColor:{type:"string"},customOverlayColor:{type:"string"},linkText:{type:"string",default:Object(o.__)("Shop now",'woocommerce')},categoryId:{type:"number"},showDesc:{type:"boolean",default:!0},previewCategory:{type:"object",default:null}},edit:function(e){return Object(r.createElement)(F,e)},save:function(){return Object(r.createElement)(c.InnerBlocks.Content,null)}})},61:function(e,t){!function(){e.exports=this.wp.htmlEntities}()},62:function(e,t){!function(){e.exports=this.wp.date}()},63:function(e,t,n){"use strict";var r=n(8),o=n.n(r),c=n(37),a=n.n(c),i=n(11);n(2);function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}t.a=function(e){var t=e.srcElement,n=e.size,r=void 0===n?24:n,c=a()(e,["srcElement","size"]);return Object(i.isValidElement)(t)&&Object(i.cloneElement)(t,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){o()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({width:r,height:r},c))}},69:function(e,t){!function(){e.exports=this.wp.dom}()},73:function(e,t){},74:function(e,t){},75:function(e,t){},76:function(e,t){},77:function(e,t){},79:function(e,t){},80:function(e,t){},81:function(e,t){},82:function(e,t){},84:function(e,t){},85:function(e,t){},86:function(e,t){},87:function(e,t){},88:function(e,t){},9:function(e,t){!function(){e.exports=this.wp.apiFetch}()},98:function(e,t,n){}});
 