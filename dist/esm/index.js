function t(t,e){var r,i;if("function"==typeof e)void 0!==(i=e(t))&&(t=i);else if(Array.isArray(e))for(r=0;r<e.length;r++)void 0!==(i=e[r](t))&&(t=i);return t}function e(t,e){return"-"===t[0]&&Array.isArray(e)&&/^-\d+$/.test(t)?e.length+parseInt(t,10):t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return Object(t)===t}function n(t){return 0===Object.keys(t).length}var o=["__proto__","prototype","constructor"],s=function(t){return-1===o.indexOf(t)};function a(t,e){t.indexOf("[")>=0&&(t=t.replace(/\[/g,e).replace(/]/g,""));var r=t.split(e);if(r.filter(s).length!==r.length)throw Error("Refusing to update blacklisted property "+t);return r}var c=Object.prototype.hasOwnProperty;function p(t,e,r,i){if(!(this instanceof p))return new p(t,e,r,i);void 0===e&&(e=!1),void 0===r&&(r=!0),void 0===i&&(i=!0),this.separator=t||".",this.override=e,this.useArray=r,this.useBrackets=i,this.keepArray=!1,this.cleanup=[]}var u=new p(".",!1,!0,!0);function f(t){return function(){return u[t].apply(u,arguments)}}p.prototype._fill=function(e,r,o,s){var a=e.shift();if(e.length>0){if(r[a]=r[a]||(this.useArray&&function(t){return/^\d+$/.test(t)}(e[0])?[]:{}),!i(r[a])){if(!this.override){if(!i(o)||!n(o))throw new Error("Trying to redefine `"+a+"` which is a "+typeof r[a]);return}r[a]={}}this._fill(e,r[a],o,s)}else{if(!this.override&&i(r[a])&&!n(r[a])){if(!i(o)||!n(o))throw new Error("Trying to redefine non-empty obj['"+a+"']");return}r[a]=t(o,s)}},p.prototype.object=function(e,r){var i=this;return Object.keys(e).forEach((function(n){var o=void 0===r?null:r[n],s=a(n,i.separator).join(i.separator);-1!==s.indexOf(i.separator)?(i._fill(s.split(i.separator),e,e[n],o),delete e[n]):e[n]=t(e[n],o)})),e},p.prototype.str=function(e,r,i,n){var o=a(e,this.separator).join(this.separator);return-1!==e.indexOf(this.separator)?this._fill(o.split(this.separator),i,r,n):i[e]=t(r,n),i},p.prototype.pick=function(t,r,i,n){var o,s,c,p,u;for(s=a(t,this.separator),o=0;o<s.length;o++){if(p=e(s[o],r),!r||"object"!=typeof r||!(p in r))return;if(o===s.length-1)return i?(c=r[p],n&&Array.isArray(r)?r.splice(p,1):delete r[p],Array.isArray(r)&&(u=s.slice(0,-1).join("."),-1===this.cleanup.indexOf(u)&&this.cleanup.push(u)),c):r[p];r=r[p]}return i&&Array.isArray(r)&&(r=r.filter((function(t){return void 0!==t}))),r},p.prototype.delete=function(t,e){return this.remove(t,e,!0)},p.prototype.remove=function(t,e,r){var i;if(this.cleanup=[],Array.isArray(t)){for(i=0;i<t.length;i++)this.pick(t[i],e,!0,r);return r||this._cleanup(e),e}return this.pick(t,e,!0,r)},p.prototype._cleanup=function(t){var e,r,i,n;if(this.cleanup.length){for(r=0;r<this.cleanup.length;r++)e=(e=(n=(i=this.cleanup[r].split(".")).splice(0,-1).join("."))?this.pick(n,t):t)[i[0]].filter((function(t){return void 0!==t})),this.set(this.cleanup[r],e,t);this.cleanup=[]}},p.prototype.del=p.prototype.remove,p.prototype.move=function(e,r,i,n,o){return"function"==typeof n||Array.isArray(n)?this.set(r,t(this.pick(e,i,!0),n),i,o):(o=n,this.set(r,this.pick(e,i,!0),i,o)),i},p.prototype.transfer=function(e,r,i,n,o,s){return"function"==typeof o||Array.isArray(o)?this.set(r,t(this.pick(e,i,!0),o),n,s):(s=o,this.set(r,this.pick(e,i,!0),n,s)),n},p.prototype.copy=function(e,r,i,n,o,s){return"function"==typeof o||Array.isArray(o)?this.set(r,t(JSON.parse(JSON.stringify(this.pick(e,i,!1))),o),n,s):(s=o,this.set(r,this.pick(e,i,!1),n,s)),n},p.prototype.set=function(t,e,i,n){var o,s,p,u;if(void 0===e)return i;for(p=a(t,this.separator),o=0;o<p.length;o++){if(u=p[o],o===p.length-1)if(n&&r(e)&&r(i[u]))for(s in e)c.call(e,s)&&(i[u][s]=e[s]);else if(n&&Array.isArray(i[u])&&Array.isArray(e))for(var f=0;f<e.length;f++)i[p[o]].push(e[f]);else i[u]=e;else c.call(i,u)&&(r(i[u])||Array.isArray(i[u]))||(/^\d+$/.test(p[o+1])?i[u]=[]:i[u]={});i=i[u]}return i},p.prototype.transform=function(t,e,r){return e=e||{},r=r||{},Object.keys(t).forEach(function(i){this.set(t[i],this.pick(i,e),r)}.bind(this)),r},p.prototype.dot=function(t,e,o){e=e||{},o=o||[];var s=Array.isArray(t);return Object.keys(t).forEach(function(a){var c=s&&this.useBrackets?"["+a+"]":a;if(i(t[a])&&(r(t[a])&&!n(t[a])||Array.isArray(t[a])&&!this.keepArray&&0!==t[a].length)){if(s&&this.useBrackets){var p=o[o.length-1]||"";return this.dot(t[a],e,o.slice(0,-1).concat(p+c))}return this.dot(t[a],e,o.concat(c))}s&&this.useBrackets?e[o.join(this.separator).concat("["+a+"]")]=t[a]:e[o.concat(c).join(this.separator)]=t[a]}.bind(this)),e},p.pick=f("pick"),p.move=f("move"),p.transfer=f("transfer"),p.transform=f("transform"),p.copy=f("copy"),p.object=f("object"),p.str=f("str"),p.set=f("set"),p.delete=f("delete"),p.del=p.remove=f("remove"),p.dot=f("dot"),["override","overwrite"].forEach((function(t){Object.defineProperty(p,t,{get:function(){return u.override},set:function(t){u.override=!!t}})})),["useArray","keepArray","useBrackets"].forEach((function(t){Object.defineProperty(p,t,{get:function(){return u[t]},set:function(e){u[t]=e}})})),p._process=t;var l=p;const h=t=>{const e=[];return Object.keys(l.dot(t.properties)).forEach((r=>{const i=(t=>{const e=t.replaceAll("properties.","").split(".");return e.slice(0,e.length-1).join(".")})(r),n=r.split("."),o=n.slice(0,n.length-1).join("."),s=l.pick(o,t.properties),a={value:i,...s};e.find((t=>t.value===i))||e.push(a)})),e},y=(t,e)=>{let r=null;return Object.keys(l.dot(t)).forEach((i=>{if(i.includes("type")&&l.pick(i,t)===e){const e=i.replace("type","scope"),n=l.pick(e,t).split("/"),o=n[n.length-1];r=o}})),r},d=t=>{if(t.baseKeys.dynamicObjectKey)return t[t.baseKeys.dynamicObjectKey].reduce(((t,{source:e,target:r})=>r?.value?(t[e.value]=r.value,t):t),{})};var v=Object.freeze({__proto__:null,createSchema:({source:t,target:e,uischema:r,dataToTransform:i})=>{const n=y(r,"Dynamic"),o=y(r,"SourceTable"),s=y(r,"TransformedTable"),a=h(t),c=h(e);return{schema:{type:"object",properties:{[n]:{type:"array",items:{type:"object",required:["target"],properties:{source:{type:"object",title:t?.title,enum:a},target:{type:"object",title:e?.title,enum:c}}}},...o&&{[o]:{type:"object"}},...s&&{[s]:{type:"object"}}}},data:{[n]:a.map((t=>({source:t}))),[o]:i,[s]:i,baseKeys:{dynamicObjectKey:n}}}},createRecipe:d,transformData:(t,e)=>{const r=d(t);return l.transform(l.dot(r),e)}});export{v as sessionDataMapper};
