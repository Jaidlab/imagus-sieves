let m;
if(m=$._.match(/"contentUrl":\s*"([^"]+)/)?.[1])return m;
if(m=$._.match(/<iframe class="vid"[^>]+src="([^"]+)/)?.[1])return {loop:m};
if(m=$._.match(/mediaId:\s*'([^']+)/)?.[1])return {loop:'//cdn.jwplayer.com/v2/media/'+m+'?gamespot'};
m=JSON.parse($._).playlist[0];
this.TRG.IMGS_ext_data = ['//' + 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>', `<imagus-extension type="videojs" url="${m.mrss_video_url}"></imagus-extension>${m.description}`];
return {loop:'imagus://extension'}