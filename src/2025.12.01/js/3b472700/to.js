let m=document.body.outerHTML.match(/id="__NEXT_DATA__" type="application\/json">({.+?})<\//);
m=m&&JSON.parse(m[1]).props?.pageProps?.page?.['@"video",']?.sections?.flatMap(i=>i.content||[]);
if(m=m.find(i=>i.image?.model?.blocks?.src?.includes($[3])))return 'https://www.bbc.com'+m.href;
return $[1]+($[2]?'1920x1080':'2048')+$[3]