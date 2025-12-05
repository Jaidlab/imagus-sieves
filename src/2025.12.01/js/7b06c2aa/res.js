const low_quality_first = false // True shows lower quality video first. Toggle with TAB.

if($[2].endsWith('c'))return {loop:$._.match(/"VideoObject","url":"([^"]+)/)?.[1]||''}
$=new DOMParser().parseFromString($._,'text/html').getElementsByClassName('vid-card_cnt h-mod')?.[0].getAttribute('data-options');
$=$&&JSON.parse($).flashvars?.metadata;
$=$&&JSON.parse($);
if($?.videos?.length&&!/^ya(?:ndex)?\./.test(location.hostname)){
$=$.videos;
const hd=$.pop()?.url, sd=$.reverse().find(i=>i.name==='sd'||i.name==='low'||i.name==='lowest')?.url, m='#mp4', t=low_quality_first;
return [[[hd&&(t?'':'#')+hd+m,sd&&(t?'#':'')+sd+m]]]
}
$=$?.hlsManifestUrl;
this.TRG.IMGS_ext_data=['//data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>',`<imagus-extension type="videojs" url="${$}"></imagus-extension>`];
return $ ? {loop:'imagus://extension'} : ''