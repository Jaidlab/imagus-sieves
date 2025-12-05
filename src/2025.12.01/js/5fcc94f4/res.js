var i = $._.indexOf('<ul class="more-image">');
if(i<0) { return null; }
var t = $._.indexOf('</ul>', i);
if(t<0) { return null; }
var res = [];
var re = /href="([^"]+)"/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;