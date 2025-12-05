if(!/^\{/.test($._))return ''
const o = JSON.parse($._), n = o.duration;
let m = o.files[0] ? o.files : o.streamingPlaylists[0]?.files
m.reverse()
return [[["#"+m.pop().fileUrl,m&&m.length&&m[m.length-1].fileUrl],[o.name,o.account.name,new Date(o.createdAt).toDateString(),[Math.floor(n/3600).toString().replace('0',''),Math.floor((n%3600)/60).toString().replace(/^(\d)$/,'0$1'),Math.floor(n%60).toString().replace(/^(\d)$/,'0$1')].filter(Boolean).join(":"),o.description].filter(Boolean).join(" | ")]]