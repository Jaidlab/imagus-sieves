var i = $._.indexOf('<ul class="gallery__thumbs-list js__gallery-thumbs">');
if(i<0) { return null;}
var t = $._.indexOf('</ul>', i);
if(t<0) { return null; }
var res = [];
var re = /data-href="([^"]+)"/gi
let data=$._.substring(i,t);
var a = re.exec(data);
while(a) {
 res.push([a[1]]);
 a = re.exec(data);
}
if (res.length<1) {
 return $._.match(/<meta property="og:image" content="([^"]+)"/)[1];
}
return res;