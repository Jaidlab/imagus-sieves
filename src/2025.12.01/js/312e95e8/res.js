var i = $._.indexOf('div class="carousel-inner"');
console.log(i);
if(i<0) { return null; }
var t = $._.indexOf('<div class="preview-gallery mhide">', i);
console.log(t);
if(t<0) { return null; }
var res = [];

var re = /<img class="outline m-auto" src="([^"]+)"/gi
var a = re.exec( $._.substring(i,t) );
while(a)   {
   res.push([a[1].replace('s.jpg','f.jpg')]);
   a = re.exec( $._.substring(i,t) );
}
return res;