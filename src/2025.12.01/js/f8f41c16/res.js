var video=$._.match(/<meta property="og:video" content="([^"]+)">/);
if (video) return video[1];
var i = $._.indexOf('aria-label="Item image slideshow">');
if(i<0) { return null; }
var t = $._.slice(t).search(/<\/div>\s+<\/section>\s+<\/div>/gi);
if(t<0) { return null; }
t=t+i;
var res = [];
var re = /<a class="carousel-image-wrapper" href="([^"]+)"[\s\S]+?<div class="carousel-caption">(?:\s+)?(.+)<\/div>/gi
var data=$._.substring(i,t);
var a = re.exec(data);
while(a)   {
   res.push(['https://archive.org'+a[1],a[2].trim()]);
   a = re.exec(data);
}
return res;