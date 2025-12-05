$=JSON.parse($._)
if (!$.user) return null;
$.s = $.software_items.map(function(i) {return i.name}).join(', ')
$.c = [$.title, $.description.replace(/^<p>(.*)<\/p>$/, '$1')].filter(function(x) {return !!x.trim()}).join(' - ') + ' by ' + $.user.username;
return $.assets.map(function(x, i){
 var u=[x.image_url], k=u[0].replace('/large/', '/4k/')
 if(k!=u[0])u.unshift(k)
 return [u, [(i ? '' : '[' + $.c + ($.s ? ' in ' + $.s : '') + ']'), (x.title||x.title_formatted||'')].join(' ')]
})