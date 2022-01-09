import e,{createContext as t,useContext as r,useState as n,useRef as u,useEffect as i}from"react";function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},c.apply(this,arguments)}function f(e,t){if(null==e)return{};var r,n,u=function(e,t){if(null==e)return{};var r,n,u={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(u[r]=e[r]);return u}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(u[r]=e[r])}return u}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,u,i=[],a=!0,l=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){l=!0,u=e}finally{try{a||null==r.return||r.return()}finally{if(l)throw u}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return v(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var s=t(),m=["children"],b=function(t){var r=t.children,n=f(t,m);return e.createElement("button",n,r)},p=["children","id"],y=["children"],h=["fieldType","name"],O={datalist:function(t){var r=t.children,n=t.id,u=f(t,p),i="".concat(n,"s");return e.createElement(e.Fragment,null,e.createElement("input",c({list:i,id:n},u)),e.createElement("datalist",{id:i},r))},input:function(t){return e.createElement("input",t)},select:function(t){var r=t.children,n=f(t,y);return e.createElement("select",n,r)},textarea:function(t){return e.createElement("textarea",t)}},g=function(t){var n=t.fieldType,u=void 0===n?"input":n,i=t.name,a=f(t,h),o=r(s),c=o.values,d=o.handleChange,v=o.handleBlur;if("button"===u)return e.createElement(b,a);var m=c[i],p=O[u];return e.createElement(p,l(l({},a),{},{name:i,value:m,onChange:d,onBlur:v,id:i}))},j=function(e,t){return void 0!==e?e:!Object.keys(t).length},E=function(e){var t=e.initialValues,r=e.onSubmit,a=e.initialTouched,c=void 0===a?{}:a,f=e.initialErrors,v=void 0===f?{}:f,s=e.initialIsValid,m=e.runInitialValidation,b=void 0!==m&&m,p=e.validate,y=e.validateOnChange,h=void 0===y||y,O=e.validateOnBlur,g=void 0===O||O,E=d(n(t),2),w=E[0],S=E[1],P=d(n(v),2),k=P[0],x=P[1],A=d(n(c),2),C=A[0],I=A[1],V=d(n(j(s,v)),2),D=V[0],B=V[1],F=d(n(0),2),T=F[0],M=F[1],U=u(null),$=u(null),q=u(null),z=function(){if(!p)return!0;var e=p(w);return x(e),!Object.keys(e).length};i((function(){if(q.current){var e=!Object.keys(k).length;B(e)}q.current||(q.current=!0)}),[k]),i((function(){b&&z()}),[]),i((function(){h&&U.current&&z(),U.current||(U.current=!0)}),[w]),i((function(){g&&$.current&&z(),$.current||($.current=!0)}),[C]);var G=function(e){var t=e.name,r=e.value,n=l(l({},w),{},o({},t,r));S(n)},H=function(){U.current=null,$.current=null,q.current=null,S(t),x(v),I(c),B(j(s,v)),M(0)};return{values:w,errors:k,touched:C,handleChange:function(e){var t=e.target,r=t.name,n=t.value;G({name:r,value:n})},setFieldValue:function(e){var t=e.name,r=e.value;G({name:t,value:r})},setValues:S,handleBlur:function(e){var t=e.target.name;C[t]||I((function(e){return l(l({},e),{},o({},t,!0))}))},validateForm:z,isValid:D,handleSubmit:function(e){e&&e.preventDefault(),M((function(e){return e+1})),I(Object.keys(w).reduce((function(e,t){return l(l({},e),{},o({},t,!0))}),{})),z()&&r(w,H)},formSubmitCount:T,resetForm:H}},w=["children"],S=function(t){var r=t.children,n=f(t,w),u=E(n),i=u.handleSubmit;return e.createElement(s.Provider,{value:u},e.createElement("form",{onSubmit:i},r(u)))};export{g as Field,S as Form,s as FormContext,E as useForm};
