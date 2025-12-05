let i = $._.indexOf('pub__img');
if(i<0) { return null; }
let t = $._.indexOf('id="comments_block"', i);
if(t<0) { return null; }
let res = [];
let re = /src="([^"]+\.svg)"/gi
let data=$._.substring(i,t);
let a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;