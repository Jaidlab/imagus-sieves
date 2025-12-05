this.cl_imgs=this.cl_imgs||JSON.parse(document.body.outerHTML.match(/"__NEXT_DATA__" type="application\/json">({.+?})<\/script/)?.[1]||'{}').props.initialState.productPage.productHeader.payload.productBase.images;
$=this.cl_imgs.find(i=>i.sources.find(x=>x.url==='https://'+$[0])).sources;
return $[$.length-1].url