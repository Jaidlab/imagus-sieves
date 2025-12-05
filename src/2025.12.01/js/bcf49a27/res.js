if($[1]==='brand')return {loop:$._.match(/\/\/player\.smotrim\.ru\/iframe\/video\/id\/[^"]+/)?.[0]||''}
$=JSON.parse($._).data;
if(!$)return null;
const x=new XMLHttpRequest(), t=$.tagsTitle||'';
$=$.playlist?.medialist[0]?.sources.m3u8?.auto;
x.open('GET',$,false)
x.send()
$=$.replace(/playlist\.m3u8.+/,x.responseText.match(/chunklist_[^\n]+/)[0])
this.TRG.IMGS_ext_data = [ '//' + 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>', `<imagus-extension type="videojs" url="${$}"></imagus-extension>${t}` ];
return $ ? {loop:'imagus://extension'} : null