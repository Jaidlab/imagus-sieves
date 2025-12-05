if($[1]){
$=JSON.parse($._.match(/"__NEXT_DATA__" type="application\/json">(.+?)<\/script/)[1])?.props?.pageProps?.vodInfo;
if(!$)return null;
const id=$.clip.videoId, key=$.play.inKey;
return {loop:`https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/${id}?key=${key}`}
}
$=JSON.parse($._).videos?.list?.sort((a,b)=>b.bitrate.video-a.bitrate.video);
return $?.length ? [[['#'+$[0].source,$[Math.floor($?.length/2.5)]?.source]]] : ''