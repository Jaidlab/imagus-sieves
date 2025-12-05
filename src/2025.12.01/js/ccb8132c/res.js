var r = $._.match(/data-fancybox-href="([^"]+)/g) || !1, t = $._.match(/<h1>([^<]+)</)
return r && r.map(function(x, i){
 return [x.slice(20).replace(/-thumb(-daz3d)/, '-main$1'), !i && t && t[1]]}
)