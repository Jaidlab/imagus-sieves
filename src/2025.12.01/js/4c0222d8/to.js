var m = document.evaluate('./ancestor-or-self::a[contains(@m, "imgurl") or contains(@m, "murl")]/@m', this.node ,null,2,null).stringValue
m = m && JSON.parse(m);
m = m && (m.imgurl||m.murl)
return (m ? m + '\n' : '') + $[1]