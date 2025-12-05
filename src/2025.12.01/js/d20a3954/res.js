$=JSON.parse($._).item;
if(!$)return null;
const t=[$.title,$.channel.name,new Date($.createdAt).toLocaleString('ru-RU'),$.description].filter(Boolean).join(" | ");
$=Object.entries($.profiles).sort((a,b)=>parseInt(b[0])-parseInt(a[0]))[0][1].hls+'#.m3u8';// '#.m3u8' needed for media to be recognized as HLS.
this.TRG.IMGS_ext_data = [ '//' + 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>', `<imagus-extension type="videojs" url="${$}"></imagus-extension>${t}` ];
return {loop:'imagus://extension'}