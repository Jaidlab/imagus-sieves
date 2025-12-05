var t,u=$._.match(/src="https?:\/\/(www\.)?gifbin\.com\/bin\/[^"]+/g)
if(!u)return 0
t=$._.match(/="og:title"\s+content="([^"]+)/);
return [[u.slice(0,3).map(function(u){ return u.slice(5) }), t&&t[1]]]