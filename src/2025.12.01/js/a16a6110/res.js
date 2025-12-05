let i = $._.indexOf('<ul class="product-card__big">');
if(i<0) {return null; }
let t = $._.indexOf('</ul>', i);
if(t<0) {return null; }
let res = [];
let re = /data-src="([^"]+)"/gi
let data=$._.substring(i,t);
let a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;