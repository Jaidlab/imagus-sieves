var i = $._.indexOf('<div class="message-image swiper-container">');
if(i<0) { return null; }
var t = $._.indexOf('<div class="swiper-pagination"></div>', i);
if(t<0) { return null; }
let data=$._.substring(i,t);
var res = [];
var re = /src="([^"]+)"/gi
var a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;