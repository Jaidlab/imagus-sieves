const use_mp4_video = false // If set to true, the sieve uses lower quality MP4 video, false uses higher quality HLS video.

if($[1]&&location.pathname==='/reel/'){
$=JSON.parse(document.body.outerHTML.match(/"(?:media|playback_video)":({.+?"browser_native_sd_url".+?})(?:}\]|,"video_owner")/)?.[1]||'{}')
return $.browser_native_hd_url||$.browser_native_sd_url?[[[$.browser_native_hd_url?.replace(/.+/,'#$&'),$.browser_native_sd_url]]]:''
}
const x=new XMLHttpRequest()
x.open('Get',$[1]&&/\/reel\/\d+/.test(location.pathname)?'https://www.facebook.com/reel/'+location.pathname.match(/\/reel\/(\d+)/)[1]:$[0],false)
x.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
x.send()
const t=x.responseText.match(/"og:description" content="([^"]+)/)?.[1]||''
if(!use_mp4_video&&!$[1]&&/"dash_manifest_url":"/.test(x.responseText)){
console.log('reel')
console.log($._)
$=x.responseText.match(/"dash_manifest_url":"([^"&]+)/)?.[1].replace(/\\/g,'')||''
this.TRG.IMGS_ext_data = ['//' + 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>',`<imagus-extension type="videojs" url="${$}"></imagus-extension>${t}`]
return $?.length?{loop:'imagus://extension'}:''
}else{
$=JSON.parse(x.responseText.match(/"(?:media|playback_video)":({.+?"browser_native_sd_url".+?})(?:}\]|,"video_owner")/)?.[1]||'{}')
return $.browser_native_hd_url||$.browser_native_sd_url?[[[$.browser_native_hd_url?.replace(/.+/,'#$&'),$.browser_native_sd_url],t]]:''
}