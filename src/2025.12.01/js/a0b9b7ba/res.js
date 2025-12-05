var i = $._.indexOf('<figure class="product');
if(i<0) {return null; }
var t = $._.indexOf('</figure>', i);
if(t<0) {return null; }
var res = [];
var re = /<a class="product-image-\d+" href="([^"]+)"/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
i = $._.indexOf('<ul class="comments-branch reviews-branch">');
if(i<0) {return res; }
t = $._.indexOf('</ul>', i);
if(t<0) {return res; }
data=$._.substring(i,t);
re = /src="([^"]+)"/gi
a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;