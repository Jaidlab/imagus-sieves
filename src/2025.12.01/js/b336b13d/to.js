var n=this.node, r=/\.(jpe?g|gif|png|bmp|web[mp]|mp[34])\b/i
console.log(n.title)
return $[1]==1 || r.test(n.textContent) || r.test(n.title) || ~(n.src||'').indexOf($[1]) || n.classList.contains('thumbnail') ? $[0].replace(/thumb=1&?/,'') : ''