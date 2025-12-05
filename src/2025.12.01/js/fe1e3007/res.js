const use_sidebar = true // True shows sidebar with product description

const imgs=JSON.parse($._.match(/<script type="application\/ld\+json">({.+?})</)[1]), vid=JSON.parse($._.match(/<script type="application\/ld\+json">({"@type":"Video.+?})</)?.[1]||'{}'), t=imgs.description;
$=imgs.image?.map((i,n)=>[i.contentURL,!n?t:''])||[];
if(vid?.contentURL)$.push([vid?.contentURL]);
if(use_sidebar){
$[0][1]=`<imagus-extension type="sidebar">${t.replace(/\n{3,}/g,'\n\n')}</imagus-extension>`;
this.TRG.IMGS_ext_data=$;
return {loop:'imagus://extension'}
}
return $