let i = $._.indexOf('<span id="gallery-images"');
if(i<0) { return null; }
let t = $._.indexOf('<div id="goods_info">', i);
if(t<0) { return null; }
let res = [];
let re = /<span data-href="([^"]+)"/gi
let data=$._.substring(i,t);
let a = re.exec(data);
while(a) {
  res.push([a[1]]);
   a = re.exec(data);
}
return res;