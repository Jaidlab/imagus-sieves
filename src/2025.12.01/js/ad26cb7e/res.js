var i = $._.indexOf('class="lamnia-slider');
if(i<0) {return null; }
var t = $._.indexOf('</a></div>', i);
if(t<0) {return null; }
var res = [];
var re = /src="([^"]+)"/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a)   {
   res.push([a[1].replace('140x140','800x800')]);
   a = re.exec(data);
}
return res;