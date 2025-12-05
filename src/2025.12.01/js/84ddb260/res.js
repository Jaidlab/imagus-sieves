let i = $._.indexOf('<div class="swiper-wrapper">');
if(i<0) { return null; }
let t = $._.indexOf('<div class="thumbnail"', i);
if(t<0) { return null; }
let res = [];
let re = /<img src="([^?"]+)\?[^"]+" title="/gi
let data=$._.substring(i,t);
let a = re.exec(data);
while(a) {
 res.push([a[1]]);
 a = re.exec(data);
}
return res;