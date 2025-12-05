var i = $._.indexOf('<div class="item-gallery__preview">');
if(i<0) { return null; }
var t = $._.indexOf('<i class="item-gallery__zoom-in jsGalleryZoomInBtn">',i);
if(t<0) { return null; }
var res = [];
var re = /src="([^"]+)"/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a)   {
   res.push([a[1]]);
   a = re.exec(data);
}
return res;