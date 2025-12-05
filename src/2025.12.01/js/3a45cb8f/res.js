let sd, hd, g, t='', u='https://cdn.displate.com/artwork/', e='.jpg';
if($[2]){
 $[1]='https://'+$[1];
 sd=$[1]+(Number($[2])>Number($[3])?'1208x863/':'863x1208/')+$[4];
 hd=$[1]+$[4];
}else{
 if($.base[0]==='d'){
  const x=platform.firefox ? new content.XMLHttpRequest() : new XMLHttpRequest();
  x.open('GET',$[0],false);
  x.send();
  $._=x.responseText;
 }
 $=$._.match(/"__NEXT_DATA__"[^>]+>({.+?})</);
 $=$&&JSON.parse($[1]).props?.pageProps;
 if(g=$?.data?.artworks)return g.map(i=>[['#'+u+i.imageCoreUrl+e, u+(i.orientation==='vertical'?'863x1208/':'1208x863/')+i.imageCoreUrl+e]]);
 if(g=$?.limitedEdition?.general?.images)return [...g.productImageCoreUrls, ...g.detailImageCoreUrls||[]].map(i=>['https://static.displate.com/1200x1200/limited/'+i+e]);
 $=$?.pdpGeneral?.product;
 t=$?.description;
 sd=u+($?.orientation==='vertical'?'863x1208/':'1208x863/')+$?.imageCoreUrl+e;
 hd=u+$?.imageCoreUrl+e;
}
return $ ? [[sd,t],[hd]] : ''