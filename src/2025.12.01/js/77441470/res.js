var i = $._.indexOf('<div class="card-product-img__labels">');
if(i<0) { return null; }
var t = $._.indexOf('<div class="swiper-initialized card-product-img__preview"', i);
if(t<0) { return null; }
var res = [];
var re = /data-src="([^"]+)"/gi
let data=$._.substring(i,t);
var a = re.exec(data);
while(a) {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;