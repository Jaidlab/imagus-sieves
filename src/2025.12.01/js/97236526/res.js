const media = m => {
m=m.mediaSources;
if(m.some(i=>/\.mp4/.test(i.url)))return m.find(i=>/\.mp4/.test(i.url)).url;
let l=m.filter(i=>i.height<1080).sort((a,b)=>b.height-a.height)[0]?.url;
m=m.sort((a,b)=>b.height-a.height)[0]?.url;
return m?.length?[[['#'+m,l]]]:'';
}
$=$._[0]==='{'?$._:$._.match(/{\\"post\\":({.+?})}\]\]\\n/)?.[1].replace(/(?<!\\)\\"/g,'"').replace(/"\]\)<\/script><script>self[^,]+,"/g,'');
$=$&&JSON.parse($);
if($?.albumContent)return $.albumContent.map(media);
return $ ? media($) : ''