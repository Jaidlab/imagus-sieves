const max_resolution = 1080

if($.base[0]==='d'){
const x=new XMLHttpRequest()
x.open('POST',`https://${$[1]}al_video.php?act=show`,false)
x.setRequestHeader('content-type','application/x-www-form-urlencoded')
x.setRequestHeader('x-requested-with','XMLHttpRequest')
x.send(`act=show&al=1${$[4]||''}&video=${$[2]}_${$[3]}`)
$._=x.responseText
}
const params = ($.base[0]!=='d' ? JSON.parse($._.match(/playerParams = ({.+?});/)?.[1]||'{}') : JSON.parse($._.slice($._.indexOf('{'))).payload[1][4]?.player)?.params[0]
const max_res_url = (i) => i[Object.keys(i).reduce((a, c) => (/^url\d+$/.test(c) &&  Number(c.slice(3)) <= max_resolution && Number(c.slice(3)) > Number(a.slice(3))) ? c : a, '')]
return !/^ya(?:ndex)?\./.test(location.hostname) && Array.isArray(params) && Object.keys(params).some(i=>/^url\d+$/.test(i)) ? [ max_res_url(params) + '#mp4', params.md_title ] : {loop:params?.hls_live||params?.hls||params?.dash_ondemand||params?.hls_ondemand||$._.match(/src=\\"([^"]+)/)?.[1].replace(/\\/g,'')||''}