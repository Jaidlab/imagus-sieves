var i = $._.indexOf('<ul class="thumbgallery gallery clearfix">');
if(i<0) { return null; }
var t = $._.indexOf('<div id="fileinfo"', i);
if(t<0) { return null; }
let data=$._.substring(i,t);
var res = [];
var re = /data-src="([^"]+)"/gi
var a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;