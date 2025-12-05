let i = $._.indexOf('="posts-container">');
if(i<0) { return null; }
let t = $._.indexOf('class="pagination numbered"', i);
if(t<0) { return null; }
let res = [];
let re = /data-file-url="([^"]+)"/gi
let data=$._.substring(i,t);
let a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;