const img = (m,n) => 'https'+m.value.url?.match(/:[^?]+/)[0]?.replace('rukmini1','rukminim2').replace('{@width}/{@height}',`${n}/${n}`);
$=JSON.parse($._.match(/window\.__INITIAL_STATE__\s*=\s*({.+?});<\//)[1]);
this.TRG.IMGS_ext_data=$.pageDataV4.page.data['10001'][0].widget.data.multimediaComponents.map(i=>i.value.contentType==='VIDEO' ? ['',`<imagus-extension type="iframe" url="${i.value.url}"></imagus-extension>`] : [['#'+img(i,2000),img(i,1024)]]);
return {loop:'imagus://extension'}