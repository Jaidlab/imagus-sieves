const m=$._.match(/<meta property="og:image" content="([^?"]+)/)?.[1];
$=$._.match(/<script id="pageContext" type="application\/json">({.+?})<\//);
$=$&&JSON.parse($[1]);
$=$?.CLIENT_STORE_INITIAL_STATE?.pageAggregation?.content?.children?.find(i=>i.type==='BODY')?.children?.find(i=>i.type==='VIDEO_ELEMENT')?.props?.sourceConfig?.progressive?.[0]?.url;
return $ ? [[[$+'#mp4',m]]] : m