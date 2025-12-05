var i = $._.indexOf('<div class="product__image-previews" id="productphotobox">');
if(i<0) { return null; }
var t = $._.indexOf('<div class="product_main-controls">', i);
if(t<0) { return null; }
var res=[];
var re = /span data-fancybox-href="([^"]+)"[^>]+title="([^"]+)"/gi
var a = re.exec( $._.substring(i,t) );
while(a)   {
   res.push([a[1],a[2]]);
   a = re.exec( $._.substring(i,t) );
}
if(!res.length){
   var re2 = /id="productphoto" data-fancybox-href="([^"]+)/
   a = re2.exec( $._.substring(i,t) );
   res.push([a[1]]);
}
return res;