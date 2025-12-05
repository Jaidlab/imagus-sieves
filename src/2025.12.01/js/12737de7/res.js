let res=/\?next/.test($.url[0])?$._.match(/<a class="swipe-link swipe-left" href=[^<]+<img src="([^"]+)/s)[1].replace('large_thumb_',''):($._.match(/src="([^"]+)"[\W]+class="image"/)||[,''])[1]
if(!res&&!/\?next/.test($.url[0]))return /class="swipe-link swipe-right"/.test($._)?{loop:$._.match(/<a class="swipe-link swipe-right" href="([^"]+)/)[1]+'?next'}:''
return res