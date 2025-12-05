var i = $._.indexOf('<div class="image-navigation">');
if(i<0) { return null; }
var t = $._.indexOf('<div class="Pager">', i);
if(t<0) { return null; }
var res = [];
var re = /<a href\s*=\s*["']([^"']+)["']/gi
var a = re.exec( $._.substring(i,t) );
while(a)   {
   res.push([a[1]]);
   a = re.exec( $._.substring(i,t) );
}
var author=$._.match(/class="vendor" href="[^"]+">([^<]+)/)?.[1].replace(/[^\w.-]/g,'_');
var name=$._.match(/p_lt_zoneContentBody_CGBytes_ProductDetail_lblName">([^<]+)/)?.[1].replace(/[^\w.-]/g,'_');
if(author&&name)this.CNT.filename=author+' - '+name;
return res;