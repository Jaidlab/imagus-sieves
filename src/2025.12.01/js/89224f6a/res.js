var i = $._.indexOf('class="swiper-zoom-container"');
if(t<0) { return null; }
var t = $._.indexOf('class="swiper-button-next"', i);
if(t<0) { return null; }
var res = [];
var re = /data-src="([^"]+)"/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a) {
 res.push([a[1].replace('amp;', '')]);
 a = re.exec( data );
}
return res;