var sf=function(){var t=function(t,n){s.prototype=Array.prototype;for(var r=e(new s),o=i(r),n=n?n.length?n[0]:n:document,a=[].slice.call("string"!=typeof t?[t]:n.querySelectorAll(t)),c=0;c!=a.length;c++)o.push(a[c]);return o},e=function(t){var e=function(){};e.prototype=t;var n=new e;return n},n=function(t,e){for(var n=t.length;n--;)e.apply(t[n],[t[n]])};t.ready=function(e,n){var n=n&&"object"==typeof n?n:window;"complete"==document.readyState?e.apply(n):t(document).addEv("readystatechange",function(){"complete"==document.readyState&&e.apply(n)})},t.requireCss=function(t){var e=this,t=Array.isArray(t)?t:[t];n(t,function(t){var n=document.createElement("link");e(n).attr("rel","stylesheet"),e(n).attr("type","text/css"),e(n).attr("href",t),e('head > link[href="'+t+'"]')[0]?!1:document.head.appendChild(n)})};var r={get:function(t,e,n){Object.defineProperty(t,e,{get:n,configurable:!0})},set:function(t,e,n){Object.defineProperty(t,e,{set:n,configurable:!0})}},i=function(t){return r.get(t,"inner",t.getInner),r.set(t,"inner",t.setInner),r.get(t,"class",t.getClass),r.set(t,"class",t.setClass),r.get(t,"style",t.getStyle),r.set(t,"style",t.setStyle),t},s=function(){this.getInner=function(){var t=this;return 1==this.length?this[0].innerHTML:function(){var e=[];return n(t,function(t){e.push(t.innerHTML)}),e.reverse()}()},this.setInner=function(t){n(this,function(e){e.innerHTML=t})},this.getClass=function(){var t=this;return 1==this.length?this[0].className:function(){var e=[];return n(t,function(t){e.push(t.className)}),e.reverse()}()},this.setClass=function(t){n(this,function(e){e.setAttribute("class",t)})},this.getStyle=function(){var t=this;return 1==this.length?function(){var e=t[0].style.cssText.split(";");return e.pop(),e}():function(){var e=[];return n(t,function(t){e.push(t.style.cssText)}),e.reverse()}()},this.setStyle=function(t){var e="";for(key in t)e+=key+":"+t[key]+";";n(this,function(t){t.style.cssText=e})},this.css=function(t,e){return"undefined"!=typeof e?this.setCss(t,e):this.getCss(t)},this.getCss=function(t){var e=this;return 1==this.length?this[0].style[t]:function(){var r=[];return n(e,function(e){r.push(e.style[t])}),r.reverse()}()},this.setCss=function(t,e){n(this,function(n){n.style[t]=e})},this.attr=function(t,e){return"undefined"!=typeof e?this.setAttr(t,e):this.getAttr(t)},this.setAttr=function(t,e){n(this,function(n){n.setAttribute(t,e)})},this.getAttr=function(t){var e=this;return 1==this.length?this[0].getAttribute(t):function(){var r=[];return n(e,function(e){r.push(e.getAttribute(t))}),r.reverse()}()},this.addAttr=function(t,e){n(this,function(n){var r=n.getAttribute(t)||e;n.setAttribute(t,r.match(e)?r:r+" "+e)})},this.rmAttr=function(t,e){n(this,function(n){var r=(n.getAttribute(t)||e).replace(e,"").replace(/(^\s+|\s+$)/,"");r?n.setAttribute(t,r):n.removeAttribute(t)})},this.addEv=function(t,e,r){return n(this,function(n){var r=r?r:!1;n.addEventListener(t,e,r)}),e},this.rmEv=function(t,e,r){n(this,function(n){var r=r?r:!1;n.removeEventListener(t,e,r)})},this.parent=function(){return t(this[0].parentNode)},this.children=function(){return t(this.stringNode()+" > *")},this.index=function(){return this.parent().children().indexOf(this[0])},this.next=function(){return this[0].nextElementSibling?t(this[0].nextElementSibling):this.first()},this.prev=function(){return this[0].previousElementSibling?t(this[0].previousElementSibling):this.last()},this.first=function(){return t(this.parent()[0].firstElementChild)},this.last=function(){return t(this.parent()[this.length-1].lastElementChild)},this.stringNode=function(){var t=this[0].nodeName.toLowerCase();return this[0].id?t+="#"+this[0].id:this[0].className&&(t+="."+this[0].className.split(" ").join(".")),t},this.cssPath=function(){for(var t=this.stringNode()+" ",e=this.parent();;){if(!e.stringNode()||"#document"==e.stringNode())break;t+="html"!=e.stringNode()?e.stringNode()+" ":e.stringNode(),e=e.parent()}return t=t.split(" ").reverse().join(" > ")},this.each=function(t){n(this,t)}};return t}();sf.ajax=function(){var t=function(t){t.dst=t.dst&&"string"==typeof t.dst?t.dst:"/",t.callback=t.callback&&"function"==typeof t.callback?t.callback:function(){},t.fallback=t.fallback&&"function"==typeof t.fallback?t.fallback:function(){},t.method=t.method&&"string"==typeof t.method?t.method:"POST",t.headers=t.headers&&"object"==typeof t.headers?t.headers:{},t.context=t.context&&"object"==typeof t.context?t.context:{};var e=new XMLHttpRequest;return 4==e.readyState||0==e.readyState?function(){e.open(t.method,t.dst,!0),e.onreadystatechange=function(){4==e.readyState&&function(){200==e.status?t.callback.apply(t.context,[e]):t.fallback.apply(t.context,[e])}()};for(h in t.headers)e.setRequestHeader(h,t.headers[h]);return e.setRequestHeader("X-REQUESTED-WITH","XMLHttpRequest"),e}():t.fallback?t.fallback(e):!1};return t.json=function(t,e,n,r,i){var e=e&&"object"==typeof e?e:{},s={dst:t,callback:n,fallback:r,context:i,headers:{"Content-type":"application/json"}},o=this(s);o&&o.send(JSON.stringify(e))},t}(),sf.alert=function(t,e,n,r){sf.requireCss("css/sf.css"),self=this;var i,n=n?n:"#3B414F",e=e?'<h1 class="sf-Alert-Title" style="color: '+n+';">'+e+"</h1>":"",t=t?'<div class="sf-Alert-Content">'+t+"</div>":"",r=r?r:"",s=self("#sf-Alerts")[0];!s&&function(){s=self.newNode("div"),s.id="sf-Alerts",self.addNode(s)}();var o=self.newNode("div");o.className="sf-Alert",o.onclick=function(){clearTimeout(i),self.rmNode(o)},o.style.fontFamily=r,o.style.opacity="0.97",o.innerHTML=e+t,self.addNode(o,s),i=setTimeout(function(){o.style.opacity="0",setTimeout(function(){self.rmNode(o)},300)},5e3)},sf.animate=function(){var t=function(t){var e=performance.now();requestAnimationFrame(function n(r){var i=(r-e)/t.duration;i>1&&(i=1);var s=t.timing(i);t.draw(100*s),1>i&&requestAnimationFrame(n)})};return t.linear=function(t){t.timing=function(t){return t},this(t)},t.cubic=function(t,e){var e=e?e:[.65,.05,.36,1],n=[0,0],r=[e[0],e[1]],i=[e[2],e[3]],s=[1,1];t.timing=function(t){var e=Math.pow(1-t,3)*n[0]+3*Math.pow(1-t,2)*t*r[0];e=e+3*(1-t)*Math.pow(t,2)*i[0]+Math.pow(t,3)*s[0];var o=Math.pow(1-t,3)*n[1]+3*Math.pow(1-t,2)*t*r[1];return o=o+3*(1-t)*Math.pow(t,2)*i[1]+Math.pow(t,3)*s[1]},this(t)},t}(),sf.changeURL=function(t){history.pushState(null,null,t),history.replaceState(null,null,t)},sf.drag=function(t,e,n,r){var i=[];e.attr("draggable","true"),e.addEv("dragstart",function(t){var t=t?t:window.event,e=t.dataTransfer,i=sf(this),s=r?sf("["+r+'="object-'+i.attr(r)+'"]'):i;e.setDragImage(s[0],t.layerX,t.layerY),e.setData("text",i.attr("data-id")),s.css("opacity","0.4"),n.css("border-left","5px solid rgba(0, 41, 158, 0.3)"),n.css("background-color","rgba(156, 223, 255, 0.2)")}),n.addEv("dragover",function(){var e=sf(this),n=e.attr("data-id");e.css("background-color","rgba(156, 223, 255, 0.7)"),i["dragleave"+n]=i["dragleave"+n]?i["dragleave"+n]:e.addEv("dragleave",function(){e.css("background-color","rgba(156, 223, 255, 0.2)")}),i["dragover"+n]=i["dragover"+n]?i["dragover"+n]:e.addEv("dragover",function(t){var t=t?t:window.event;t.preventDefault()}),i["drop"+n]=i["drop"+n]?i["drop"+n]:e.addEv("drop",t)}),e.addEv("dragend",function(){var t=sf(this),e=r?sf("["+r+'="object-'+t.attr(r)+'"]'):t;e.css("opacity","1"),n.style=""})},sf.newNode=function(t){return t?document.createElement(t):!1},sf.cloneNode=function(t){var t=t.length?t[0]:t;return t?t.cloneNode(!0):!1},sf.addNode=function(t,e){var t=t.length?t[0]:t,e=e?e.length?e[0]:e:document.body;t?e.appendChild(t):!1},sf.addNodeBefore=function(t,e){var t=t.length?t[0]:t,e=e.length?e[0]:e;t&&e?e.parentNode.insertBefore(t,e):!1},sf.rmNode=function(t){var t=t.length?t[0]:t;return t?t.parentNode.removeChild(t):!1},sf.getNodeInfo=function(t){var t=t.length?t[0]:t;return t?t.getBoundingClientRect():!1},sf.popup=function(t,e){sf.requireCss("css/sf.css");var n=this;n("#sf-popupContainer")[0]?n.rmNode(n("#sf-popupContainer")):"";var r=e?'style="background-image: url('+e+');"':"",i=n.newNode("div");i.id="sf-popupContainer",i.innerHTML='<div id="sf-popupLine"'+r+'></div><div id="sf-popupContent"></div>',i.onclick=function(t){var t=t?t:window.event;t.target.id==i.id?n.rmNode(i):""},n.addNode(i),setTimeout(function(){n("#sf-popupContent").inner=t},100)},sf.zoomImg=function(t){var e=this,n='<img src="'+t+'" id="sf-popupImg" alt="Увеличенное изображение" />';e.popup(n)};