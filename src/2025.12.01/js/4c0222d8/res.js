var m = $[0].match(/mediaurl=(http[^&]+)/);
if(m)return decodeURIComponent(m[1])
m = $._.match(/class="mainImage"[^>]+?src2="([^"]+)/)
if(m)return m[1]
m = document.evaluate('./ancestor-or-self::a[contains(@m, "imgurl") or contains(@m, "murl")]/@m',this.node,null,2,null).stringValue
return m && JSON.parse(m).imgurl || null