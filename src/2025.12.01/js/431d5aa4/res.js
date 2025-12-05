this.motorsport_key=this.motorsport_key||$._.match(/"api_key":"([^"]+)/)[1]
const x=new XMLHttpRequest()
x.open('POST','https://api.maz.tv/v1/streams/anonymous',false)
x.setRequestHeader('Content-Type','application/json')
x.send(`{"cid":"${$[4]}","progress":0,"platform":"web","first_play":true,"pcid":"${$[3]}","key":"${this.motorsport_key}","app_id":${$[2]},"language":"en","locale_id":521}`)
$=JSON.parse(x.responseText).files
return $?.m3u8||$?.hls||this.node?.src?.replace(/-\d+\./,'.')||''