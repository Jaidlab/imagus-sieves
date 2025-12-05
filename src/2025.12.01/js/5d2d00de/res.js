let i = $._.indexOf('<div class="js-items-wrapper mobile-slider__items-wrapper">');
if(i<0) { return null; }
let t = $._.indexOf('</picture></div></div></div>', i);
if(t<0) { return null; }
let res = [];
let re = /src="([^_]+)_[^.]+(\.\w+)"/gi
let data=$._.substring(i,t);
let a = re.exec(data);
while(a) {
  res.push([a[1]+a[2]]);
   a = re.exec(data);
}
return res;