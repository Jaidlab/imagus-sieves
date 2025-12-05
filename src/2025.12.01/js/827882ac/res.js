var i = $._.indexOf('<div class="detail-gallery__slide swiper-slide">')
if(!i) { return null; }
var t = $._.indexOf('<button class=', i);
if(!t) { return null; }
var res = []
var re = /src="([^"]+)"/gi
var a = re.exec( $._.substring(i,t) );
while(a){
    res.push([a[1]]);
    a = re.exec( $._.substring(i,t) );
}
return res;