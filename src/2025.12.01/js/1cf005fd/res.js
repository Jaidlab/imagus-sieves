const visible_gallery_image_first = true // <- Set to true for the visible image in the gallery to be the first image in the album, false to keep the first gallery image as the first album image.

let m, t, a = visible_gallery_image_first;
if($[1]||/gallery/.test($[0]))$._=document.body.outerHTML;
m=JSON.parse($._.match(/(?:__remixContext = |"__NEXT_DATA__"[^{]+?)({.+?});?</)?.[1]||'{}');
m=(m.state?.loaderData?.root?.objectData||m.props?.pageProps?.swrFallback?.objectDataKey)?.images?.map(i=>[(i.uri||i.src).replace(/\d{3,4}w|default/,'1600w'),i.description])||[...new Map([...$._.matchAll(/(?:background-image:url\(|data-srcset=")([^\s")]+)/g)].map(i=>[i[1].replace(/\d{3,4}w|default/,'1600w')]))];
t=this.node.currentSrc?.match(/[^/]+$/)||$[2];
return a&&t?{"":m,idx:m.findIndex(i=>RegExp(`${t}`).test(i[0]))}:m;