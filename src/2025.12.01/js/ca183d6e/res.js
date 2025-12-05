var i = $._.indexOf('class="avatar-view ">');
if(i<0) {return null; }
var t = $._.indexOf('</noindex>', i);
if(t<0) {return null; }
var res = [];
var re = /"\s+href=".+top\/([^"]+)"/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a)   {
   res.push(['https://' + a[1]]);
   a = re.exec(data);
}
return res;