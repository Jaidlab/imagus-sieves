var i = $._.indexOf('<div id="image-additional-carousel"');
if(i<0) { return null; }
var t = $._.indexOf('</ul>', i);
if(t<0) { return null; }
var res = [];
var re = /data-image="([^"]+)"/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;