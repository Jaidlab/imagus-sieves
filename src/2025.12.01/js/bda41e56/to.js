if(/\.php$/.test($[8]))return !1
if(/[&?]s=[\da-f]{32}/.test($[0]))return $[0]
var m=$[0].match(/[&?](?:url|src)=([^&]+)/)
if(m)return decodeURIComponent(m[1])
var x=$[8]&&$[8].match(/^(.*\.)(jpe?g|gif|png)$/i)
return $[1] + ($[2] || '') + ($[3] || '') + ($[4] || '') + ($[5] || '') + ($[6] ? $[6] + $[7] : '') + (x && x[2] ? x[1] + (x[2]!='j' ? x[2] : '#jpg jpeg png gif#') : $[8]||'')