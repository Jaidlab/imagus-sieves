let i = $._.indexOf('<div class="image-gallery__big');
if(i<0) { return null; }
let t = $._.indexOf('<div class="image-gallery__small', i);
if(t<0) { return null; }
let res = [];
let re = /src="([^"]+)_bulletin"/gi
let data=$._.substring(i,t);
let a = re.exec(data);
while(a)   {
   res.push([a[1]+'_default']);
   a = re.exec(data);
}
return res;