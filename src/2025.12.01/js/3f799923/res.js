if(!$[2])return $._.match(/href="([^"?]+)\?download/)[1]
var t = $._.match(/<h1>([^<]+)/), r = $._.match(/ b" src="https:\/\/thumbs[^"]+/g).map(function(i) {
 return [i.slice(9).replace(/thumb(s\d\.)/, 'image$1').replace(/_\w\./, '_o.')]
})
r[0][1] = t&&t[1]
return r