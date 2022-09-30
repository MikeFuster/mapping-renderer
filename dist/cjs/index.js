"use strict";function t(t,e){var r,i;if("function"==typeof e)void 0!==(i=e(t))&&(t=i);else if(Array.isArray(e))for(r=0;r<e.length;r++)void 0!==(i=e[r](t))&&(t=i);return t}function e(t,e){return"-"===t[0]&&Array.isArray(e)&&/^-\d+$/.test(t)?e.length+parseInt(t,10):t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return Object(t)===t}function o(t){return 0===Object.keys(t).length}Object.defineProperty(exports,"__esModule",{value:!0});var n=["__proto__","prototype","constructor"],s=function(t){return-1===n.indexOf(t)};function a(t,e){t.indexOf("[")>=0&&(t=t.replace(/\[/g,e).replace(/]/g,""));var r=t.split(e);if(r.filter(s).length!==r.length)throw Error("Refusing to update blacklisted property "+t);return r}var c=Object.prototype.hasOwnProperty;function p(t,e,r,i){if(!(this instanceof p))return new p(t,e,r,i);void 0===e&&(e=!1),void 0===r&&(r=!0),void 0===i&&(i=!0),this.separator=t||".",this.override=e,this.useArray=r,this.useBrackets=i,this.keepArray=!1,this.cleanup=[]}var u=new p(".",!1,!0,!0);function f(t){return function(){return u[t].apply(u,arguments)}}p.prototype._fill=function(e,r,n,s){var a=e.shift();if(e.length>0){if(r[a]=r[a]||(this.useArray&&function(t){return/^\d+$/.test(t)}(e[0])?[]:{}),!i(r[a])){if(!this.override){if(!i(n)||!o(n))throw new Error("Trying to redefine `"+a+"` which is a "+typeof r[a]);return}r[a]={}}this._fill(e,r[a],n,s)}else{if(!this.override&&i(r[a])&&!o(r[a])){if(!i(n)||!o(n))throw new Error("Trying to redefine non-empty obj['"+a+"']");return}r[a]=t(n,s)}},p.prototype.object=function(e,r){var i=this;return Object.keys(e).forEach((function(o){var n=void 0===r?null:r[o],s=a(o,i.separator).join(i.separator);-1!==s.indexOf(i.separator)?(i._fill(s.split(i.separator),e,e[o],n),delete e[o]):e[o]=t(e[o],n)})),e},p.prototype.str=function(e,r,i,o){var n=a(e,this.separator).join(this.separator);return-1!==e.indexOf(this.separator)?this._fill(n.split(this.separator),i,r,o):i[e]=t(r,o),i},p.prototype.pick=function(t,r,i,o){var n,s,c,p,u;for(s=a(t,this.separator),n=0;n<s.length;n++){if(p=e(s[n],r),!r||"object"!=typeof r||!(p in r))return;if(n===s.length-1)return i?(c=r[p],o&&Array.isArray(r)?r.splice(p,1):delete r[p],Array.isArray(r)&&(u=s.slice(0,-1).join("."),-1===this.cleanup.indexOf(u)&&this.cleanup.push(u)),c):r[p];r=r[p]}return i&&Array.isArray(r)&&(r=r.filter((function(t){return void 0!==t}))),r},p.prototype.delete=function(t,e){return this.remove(t,e,!0)},p.prototype.remove=function(t,e,r){var i;if(this.cleanup=[],Array.isArray(t)){for(i=0;i<t.length;i++)this.pick(t[i],e,!0,r);return r||this._cleanup(e),e}return this.pick(t,e,!0,r)},p.prototype._cleanup=function(t){var e,r,i,o;if(this.cleanup.length){for(r=0;r<this.cleanup.length;r++)e=(e=(o=(i=this.cleanup[r].split(".")).splice(0,-1).join("."))?this.pick(o,t):t)[i[0]].filter((function(t){return void 0!==t})),this.set(this.cleanup[r],e,t);this.cleanup=[]}},p.prototype.del=p.prototype.remove,p.prototype.move=function(e,r,i,o,n){return"function"==typeof o||Array.isArray(o)?this.set(r,t(this.pick(e,i,!0),o),i,n):(n=o,this.set(r,this.pick(e,i,!0),i,n)),i},p.prototype.transfer=function(e,r,i,o,n,s){return"function"==typeof n||Array.isArray(n)?this.set(r,t(this.pick(e,i,!0),n),o,s):(s=n,this.set(r,this.pick(e,i,!0),o,s)),o},p.prototype.copy=function(e,r,i,o,n,s){return"function"==typeof n||Array.isArray(n)?this.set(r,t(JSON.parse(JSON.stringify(this.pick(e,i,!1))),n),o,s):(s=n,this.set(r,this.pick(e,i,!1),o,s)),o},p.prototype.set=function(t,e,i,o){var n,s,p,u;if(void 0===e)return i;for(p=a(t,this.separator),n=0;n<p.length;n++){if(u=p[n],n===p.length-1)if(o&&r(e)&&r(i[u]))for(s in e)c.call(e,s)&&(i[u][s]=e[s]);else if(o&&Array.isArray(i[u])&&Array.isArray(e))for(var f=0;f<e.length;f++)i[p[n]].push(e[f]);else i[u]=e;else c.call(i,u)&&(r(i[u])||Array.isArray(i[u]))||(/^\d+$/.test(p[n+1])?i[u]=[]:i[u]={});i=i[u]}return i},p.prototype.transform=function(t,e,r){return e=e||{},r=r||{},Object.keys(t).forEach(function(i){this.set(t[i],this.pick(i,e),r)}.bind(this)),r},p.prototype.dot=function(t,e,n){e=e||{},n=n||[];var s=Array.isArray(t);return Object.keys(t).forEach(function(a){var c=s&&this.useBrackets?"["+a+"]":a;if(i(t[a])&&(r(t[a])&&!o(t[a])||Array.isArray(t[a])&&!this.keepArray&&0!==t[a].length)){if(s&&this.useBrackets){var p=n[n.length-1]||"";return this.dot(t[a],e,n.slice(0,-1).concat(p+c))}return this.dot(t[a],e,n.concat(c))}s&&this.useBrackets?e[n.join(this.separator).concat("["+a+"]")]=t[a]:e[n.concat(c).join(this.separator)]=t[a]}.bind(this)),e},p.pick=f("pick"),p.move=f("move"),p.transfer=f("transfer"),p.transform=f("transform"),p.copy=f("copy"),p.object=f("object"),p.str=f("str"),p.set=f("set"),p.delete=f("delete"),p.del=p.remove=f("remove"),p.dot=f("dot"),["override","overwrite"].forEach((function(t){Object.defineProperty(p,t,{get:function(){return u.override},set:function(t){u.override=!!t}})})),["useArray","keepArray","useBrackets"].forEach((function(t){Object.defineProperty(p,t,{get:function(){return u[t]},set:function(e){u[t]=e}})})),p._process=t;var l=p;const y=t=>{const e=[];return Object.keys(l.dot(t.properties)).forEach((r=>{const i=(t=>{const e=t.replace("properties.","").split(".");return e.slice(0,e.length-1).join(".")})(r),o=r.split("."),n=o.slice(0,o.length-1).join("."),s=l.pick(n,t.properties),a={value:i,...s};e.find((t=>t.value===i))||e.push(a)})),e},h=(t,e)=>{let r=null;return Object.keys(l.dot(t)).forEach((i=>{if(i.includes("type")&&l.pick(i,t)===e){const e=i.replace("type","scope"),o=l.pick(e,t).split("/"),n=o[o.length-1];r=n}})),r},d=t=>{if(t.baseKeys.dynamicObjectKey)return t[t.baseKeys.dynamicObjectKey].reduce(((t,{source:e,target:r})=>r?.value?(t[e.value]=r.value,t):t),{})};var v=Object.freeze({__proto__:null,createSchema:({source:t,target:e,uischema:r,dataToTransform:i})=>{const o=h(r,"Dynamic"),n=h(r,"SourceTable"),s=h(r,"TransformedTable"),a=y(t),c=y(e);return{schema:{type:"object",properties:{[o]:{type:"array",items:{type:"object",required:["target"],properties:{source:{type:"object",title:t?.title,enum:a},target:{type:"object",title:e?.title,enum:c}}}},...n&&{[n]:{type:"object"}},...s&&{[s]:{type:"object"}}}},data:{[o]:a.map((t=>({source:t}))),[n]:i,[s]:i,baseKeys:{dynamicObjectKey:o}}}},createRecipe:d,transformData:(t,e)=>{const r=d(t);return l.transform(l.dot(r),e)}});exports.sessionDataMapper=v;
