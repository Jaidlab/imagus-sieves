$=JSON.parse($._).result;
const t=[$.media_container_name,$.media_container_channel?.channel_name,new Date($.published_at).toLocaleString('ru-RU'),$.media_container_description].filter(Boolean).join(" | ");
$=$.media_container_streams[0]?.stream_media[0]?.media_meta?.media_archive_url;
this.TRG.IMGS_ext_data = [ '//' + 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640"></svg>', `<imagus-extension type="videojs" url="${$}"></imagus-extension>${t}` ];
return $ ? {loop:'imagus://extension'} : null