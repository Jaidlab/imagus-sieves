let data, media = [];
if($[1]==='embed'){
data = JSON.parse($._.match(/Dzen\.player\.init\((.+?)\);/)?.[1]||$._.match(RegExp(`_params=\\(({"ssrData":{.+?})\\)`))?.[1]||'{}');
media = (data.data||data.ssrData?.exportResponse)?.content?.streams?.find(i=>/\.m3u8/.test(i.url));
return media ? {loop:media.url} : ''
}
if($[1]==='news/story'){
const x = new XMLHttpRequest();
let stop = false;
data = JSON.parse($._.match(/=({.+?})<\//)?.[1]||'{}').dataSource?.news?.story?.mediaBlock?.items||[];
data.forEach(i=>{
if(i.type==='jingle')stop = true;
if(!stop){
if(i.type==='photo')media.push([i.original?.src?.replace(/\d+x\d+$/,'orig')]);
if(i.type==='video'){
x.open('GET','https://dzen.ru/embed/'+i.id+'.json',false);
x.send();
i=JSON.parse(x.responseText||'{}').content?.streams?.[0]?.url;
if(i)media.push(['',`<imagus-extension type="videojs" url="${i}"></imagus-extension>`]);
}
}
})
this.TRG.IMGS_ext_data = media;
}else{
if($[1]==='a'){
// article images
data = JSON.parse($._.match(/(?:w\._data\s*=\s*|var _params=\()({.+?"imageName".+?})\)?;/)?.[1]||'{}');
const u = '//avatars.dzeninfra.ru/get-', p = data.publication?.content?.preview||data.ssrData?.publishersResponse?.data?.data?.images;
if(p?.image?.imageName){
let p2 = p?.image;
p2 = u+[p2.namespace, p2.groupId, p2.imageName].join('/');
media.push([['#'+p2+'/orig',p2+'/scale_1200'],p.snippet||'']);
}
Object.values(data.images||p||[]).forEach(i=>{
const img = u+[i.namespace, i.groupId, i.imageName].join('/');
if(i.imageName!==p.imageName&&i.namespace!=='zen-logos')media.push([['#'+img+'/orig',img+'/scale_1200'],i.title||'']);
})
this.TRG.IMGS_ext_data = media;
}else{
// video
data = JSON.parse($._.match(RegExp(`_params=\\(({"ssrData":{.+?})\\)`))?.[1]||'{}').ssrData;
media = data?.videoMetaResponse?.video?.id;
this.TRG.IMGS_ext_data = ['//data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>',`<imagus-extension type="videojs" url="${media}"></imagus-extension>${data?.videoMetaResponse?.source?.description||''}`];
}
}
return media ? {loop:'imagus://extension'} : null