var i = $._.indexOf('productPage__displayedItem__images')
if(i<0) {return null; }
var t = $._.indexOf('<div class="clear"', i);
if(t<0) {return null; }
var res = [];
var re = /<a href="https:\/\/static\.onlinetrade\.ru\/img\/items\/\w([^"]+)"/gi
data=$._.substring(i,t);
var a = re.exec(data);
while(a){
    res.push(['https://static.onlinetrade.ru/img/items/b'+a[1]]);
    a = re.exec(data);
}
i = $._.indexOf('<div class="productPage__topReview__gallery')
if(i<0) {return res; }
t = $._.indexOf('<div class="swiper-pagination">', i);
if(t<0) {return res; }
re = /<a href="([^"]+)"/gi
data=$._.substring(i,t);
a = re.exec(data);
while(a){
    res.push([a[1]]);
    a = re.exec(data);
}
return res;