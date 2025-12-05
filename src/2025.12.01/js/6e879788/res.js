$=JSON.parse($._);
if(!$)return null;
const t=[$.title,$.author?.name,$.description].filter(Boolean).join(" | ");
$=$.video_balancer?.m3u8;
this.TRG.IMGS_ext_data = [ '//' + 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>', `<imagus-extension type="videojs" url="${$}"></imagus-extension>${t}` ];
return {loop:'imagus://extension'}