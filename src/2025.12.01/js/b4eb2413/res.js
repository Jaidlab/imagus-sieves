$=JSON.parse($._);
if(!$.video_media)return $.photo_media.map(i=>[i.url]);
$=[...$.photo_media||[], ...$.video_media||[]];
this.TRG.IMGS_ext_data=$.map(i=>i.dash_url||i.hls_url ? ['',`<imagus-extension type="videojs" url="${i.dash_url||i.hls_url}"></imagus-extension>`] : [i.url]);
return {loop:'imagus://extension'}