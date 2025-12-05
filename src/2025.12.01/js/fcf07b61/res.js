if($[1])return $._.match(/="bigimg" src=['"]([^'"]+)/)[1]
var t = $._.match(/<h1>([^<]+)/), a = $._.match(/\n\s*<img src='[^']+/g)
return a && a.map(function(x, i) {
  return [x.slice(x.lastIndexOf("'") + 1).replace('/thumbnails/', '/'), !i && t&&t[1]]
})