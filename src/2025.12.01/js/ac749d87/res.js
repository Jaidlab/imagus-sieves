var i = $._.indexOf('class="ads_photo_label">');
if(i<0) { return null; }
var t = $._.indexOf('</div></div><div', i);
if(t<0) { return null; }
var res = [];
var re = /<a href="([^"]+)"/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a) {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;