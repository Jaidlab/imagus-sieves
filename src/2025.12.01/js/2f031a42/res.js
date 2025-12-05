let data = JSON.parse($._).data;
if(!data)return '';
if($[2]){
data = data[$[3]]?.data[0]?.playerUrls?.filter(i=>i.url);
if(!data)return '';
const high = (data.find(i=>i.type==='quad_hd')||data.find(i=>i.type==='ultra_hd')||data.find(i=>i.type==='full_hd')||data.find(i=>i.type==='high'))?.url||'';
const low = (data.find(i=>i.type==='medium')||data.find(i=>i.type==='low')||data.find(i=>i.type==='lowest')||data.find(i=>i.type==='tiny'))?.url||'';
return high||low ? [[[high&&'#'+high+'#mp4',low?low+'#mp4':'']]] : ''
}
const url = data[0]?.playerUrls?.find(i=>i.type==='live_hls')?.url;
this.TRG.IMGS_ext_data = ['//data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>',`<imagus-extension type="videojs" url="${url}"></imagus-extension>`];
return url ? {loop:'imagus://extension'} : ''