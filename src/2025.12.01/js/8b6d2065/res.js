var ret = [], im, g, c, x, i, t, u, l = '//i.imgur.com/', p404='404 page</title>';

try {
 if (typeof $._ == 'string' && $._[0]!='{') {
   if($._.lastIndexOf(p404, 300) > -1) throw true;
   x = $._.match(/(?:album|image)\s*[:=] +([^\n\r]+),/);
   x = JSON.parse(x[1])
   t = this.t; delete this.t;
   if (!t&&'title' in x)t = x;
   x.album_images&&(x=x.album_images);
   x.images&&(x=x.images)||x.items&&(x=x.items);
 } else {
  $._=JSON.parse($._);
  if($._.album){
   x=$._.album
   t={title:x.title, description: x.description}
   x=x.images
  } else {
   x=$._.data.image
   if (x.is_album) {
    t={title:x.title, description: x.description}
    if (x.album_images.count != x.album_images.images.length) {
     this.t=t
     return {loop: l+'a/'+$[2]}
    }
    x=x.album_images.images
   }
  }
  delete this.t;
 }

 if (!x)throw $._.lastIndexOf(p404, 300) > -1;

 t = t && [t.title, t.description].filter(Boolean).join(' - ') || !1
 x = Array.isArray(x)?x:[x]
 for (i = 0; i < x.length; ++i) {
  im = x[i].image||x[i];
  c = [im.title, im.caption, im.description].filter(Boolean).join(' - ');
  if (!i && t && t!=c) c='['+t+'] ' + c;
  im.ext = im.ext || x[i].links.original.match(/\.[^.]+$/)[0];
  g = (''+im.animated)=='true'
  u = l + im.hash;
  ret.push([!g && im.width <= 1200 && im.height <= 1200 ? u + im.ext : (g ? [u + '.mp4', u + '.gif'] : ['#' + u + im.ext, u + 'h' + im.ext]), c]);
 }
} catch (ex) {}
return ret.length ? ret : null