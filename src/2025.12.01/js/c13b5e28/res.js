const imgs=[...$._.matchAll(/"product_gallery_main_item"><a href="([^"]+)/g)];
const vid=$._.match(/video_play"><iframe[^>]+src="([^"]+)/)?.[1];
if(vid){
this.TRG.IMGS_ext_data=imgs.concat(vid).map(i=>typeof i==='string'?['',`<imagus-extension type="iframe" url="${vid}"></imagus-extension>`]:[i[1],'']);
return {loop:'imagus://extension'};
}
return imgs.map(i=>[i[1]])