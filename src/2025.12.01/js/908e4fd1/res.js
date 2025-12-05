const max_resolution = 2160
const use_mp4 = false // True uses mp4 player, false uses HLS player

$=JSON.parse($._.match(/stream_data\s*=\s*({[^;]+})/)?.[1].replaceAll("'",'"')||'{}')
const hls=$.m3u8[0]
$=Object.entries($).filter(i=>/^\d+[pk]$/.test(i[0])&&parseInt(i[0].match(/^(\d+)[pk]$/)[1].replace(/^4$/,'2160'))<=max_resolution).sort((a,b)=>parseInt(a[0].match(/^(\d+)[pk]$/)[1].replace(/^4$/,'2160'))-parseInt(b[0].match(/^(\d+)[pk]$/)[1].replace(/^4$/,'2160'))).map(i=>i[1][0]).filter(Boolean)
return use_mp4&&$?.length?[[['#'+$.pop(),$?.[Math.floor($.length/2)]]]]:{loop:hls||''}