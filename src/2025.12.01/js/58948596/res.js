$ = $._&&$._.match(/data-imgid="[^"]+" href="([^"]+)/g)
var f=this.find, s = this.node.matches('img[src*="images.craigslist.org"]') && this.node.src
return $ && $.map(function(x){
 x=x.slice(x.lastIndexOf('"') + 1)
 return [f({src: x})]
}) || s && this.find({src: s}) || !1