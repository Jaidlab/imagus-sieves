let i = $._.indexOf('data-thumb-images');
if(i<0) { return null; }
let t = $._.indexOf('<div data-preview-images', i);
if(t<0) { return null; }
let res = [];
let re = /href="([^"]+)"/gi
let data=$._.substring(i,t);
let a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;