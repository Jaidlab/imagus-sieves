var i = $._.indexOf('<ol class="');
var res = [];
if(i<0) {
   i = $._.indexOf('<video');
   if(i<0) {
      var re = /data-photoswipe-image.+?href=\"(http[^?]+)\?/gi
      var a = re.exec($._);
      if (a) {
         res.push([a[1]]);
      } else {
         var ree = /div class=\"media-content\".+data-animated-url=\"(http[^\"]+)/gis
         var b = ree.exec($._);
         if (b) {
            res.push([b[1]]);
         } else {
            return null;
         }
      }
   } else {
      var t = $._.indexOf('</video', i);
      if(t<0) {return null;}
      var part=$._.substring(i,t);
      var re = /data-video-large=\"(http[^\"]+)/gi
      var a = re.exec(part);
      if (a) {
         res.push([a[1]]);
      } else {
         var ree = / src=\"(http[^\"]+)/gi
         var b = ree.exec(part);
         res.push([b[1]]);
      }
   }
} else {
   var t = $._.indexOf('</ol>', i);
   if(t<0) {return null;}
   var part=$._.substring(i,t);
   var re = /data-srcset=\"(http[^\?]+)/gi
   var a = re.exec(part);
   if (a) {
      var doc = new DOMParser().parseFromString(part+"</ol>", "text/html");
      var imgs = Array.from(doc.querySelectorAll("img"));
      for (const i of imgs) {
         var url = i.attributes["data-animated-url"];
         if (url) {
            res.push([url.value]);
         } else {
            url = i.attributes["data-src"];
            if (url == null) {
               url = i.attributes.src;
            }
            var ree = /(http(?=.*cdn\.)[^\?]+)/gi
            var b = ree.exec(url.value);
            if (b && (i.classList.length && 
                      i.classList[0].toLowerCase()==="lazyload")) {
               res.push([b[1]]);
            }
         }
      }
   } else {
      re = /div class=\"video-wrap\"/gi
      if (re.exec(part)) {
         var ree = /data-video-large=\"(http[^\"]+)/gi
         var b = ree.exec(part);
         res.push([b[1]]);
      }
   }
}

return res;