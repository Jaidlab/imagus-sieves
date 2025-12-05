var i = $._.indexOf('<div class="gallery__main-slick s-carousel"');
if(i<0) { return null; }
var t = $._.indexOf('<div class="', i+20);
if(t<0) { return null; }
var res = [];
var re = /<a href="([^"]+)"/gi
let data=$._.substring(i,t);
var a = re.exec(data);
while(a) {
 res.push([a[1]]);
 a = re.exec(data);
}
return res;