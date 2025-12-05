if($[1]==='video')return {loop:$._.match(/="og:video" content="([^"]+)/)?.[1]||''};
$._=JSON.parse($._);
if($[1]==='boardgame'||$[1]==='geeklist'){
this.bgg_media=this.bgg_media||[];
if($[2]==='videos'){
$._.videos?.forEach(i=>this.bgg_media.push(['',`<imagus-extension type="iframe" url="https://youtube.com/embed/${i.extvideoid}"></imagus-extension>`]));
if($._.videos?.length===50&&($[4]||0)<6)return {loop:$[0].match(/^[^?]+/)[0]+'?pageid='+(++$[4]||2)};
this.TRG.IMGS_ext_data=this.bgg_media;
}else if($[1]==='geeklist'){
const x=new XMLHttpRequest();
$._.data?.forEach(i=>{x.open('GET',`https://api.geekdo.com/api/images/${i.item?.imageid}`,false);x.send();const img=JSON.parse(x.responseText)?.images;this.bgg_media.push([['#'+img.original?.url,img.large?.url], `<imagus-extension type="sidebar">${['<b>'+i.linkedImage?.alt+'</b>',i.body,i.item?.descriptors?.map(x=>(x.name[0]==='y'?'Year Published':x.name[0]==='r'?'Rank':i.name)+': '+x.displayValue?.replace('Rank ','')).join('\n')].join('\n\n')}</imagus-extension>`])});
if($._.data?.length===25&&($[4]||0)<4)return {loop:$[0].match(/^[^?]+/)[0]+'?pageid='+(++$[4]||2)};
this.TRG.IMGS_ext_data=this.bgg_media;
}else{
$._.images?.forEach(i=>this.bgg_media.push([['#'+i.imageurl, i.imageurl_lg], i.caption||'']));
if($._.images?.length===60&&($[4]||0)<5)return {loop:$[0].match(/^[^?]+/)[0]+'?pageid='+(++$[4]||2)};
$=this.bgg_media;
}
delete this.bgg_media;
return $._ ? {loop:'imagus://extension'} : $
}
return [[['#'+$._.images.original.url, $._.images.large.url], '['+ $._.href.substr($._.href.lastIndexOf("/")+1).replace(/-/g," ").toUpperCase() +'] ' + $._.caption]]