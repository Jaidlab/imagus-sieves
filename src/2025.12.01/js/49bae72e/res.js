var i = $._.indexOf('div class="gallery"');
if(i<0) { return null; }
var t = $._.indexOf('</div></a> </div></div>', i);
if(t<0) t = $._.indexOf('<script src="', i);
if(t<0) { return null; }
var res = [];
var re = /<img class="\s?lazyload(?:ed)?" data-src="([^"]+)"/gi
var a = re.exec( $._.substring(i,t) );
while(a)   {
   res.push(['https://'+($[1][0]==='i'?'8muses.io'+a[1].replace('/th_','/full_'):'comics.8muses.com'+a[1].replace('/th/','/fl/'))]);
   a = re.exec( $._.substring(i,t) );
}
return res;