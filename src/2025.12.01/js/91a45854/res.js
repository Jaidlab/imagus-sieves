if($[1]){
let res=[], u=$._.match(/data-src="(https:\/\/[^\/]+\/(?:\d+\/){2})\d+t(\.[^"]+)/), n=$._.match(/id="load_pages" value="([^"]+)/)[1]
for(let i=1;i<=n;i++){
res.push([[u[1]+i+u[2],u[1]+i+'.webp']])
}
return res
}
if($[2])return {loop:$._.match(/src="([^"]+)/)[1]}
if($[3])return {loop:'https://nhplayer.com'+$._.match(/<li data-id="([^"]+)/)[1]}
return $._.match(/file:\s+"([^"]+)/)[1]