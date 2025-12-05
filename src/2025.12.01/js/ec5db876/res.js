var r = [];
($._.match(/"full": "[^"]+/g) || r).forEach(function(i) {r.push([i.replace('"full": "','')]);});
if (r.length==0) {
  ($._.match(/<\/span><img src="[^"]+/g) || r).forEach(function(i) {r.push([i.replace('<\/span><img src="','')]);});
}
return r;