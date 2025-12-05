var i = $._.indexOf('<div class="pps_hide"');
if(i<0) {return null; }
var t = $._.indexOf('</div>', i);
if(t<0) {return null; }
var res = [];
var re = /<a href="([^"]+)"/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;