if($[1]==='video/')return {loop:'//youtube.com/embed/'+$._.match(/data-video-id="([^"]+)/)?.[1]};
if($[1]==='gallery/'){
$=JSON.parse($._.match(/"page":\s*({.+?}),\n/)?.[1]||'{}').lightboxImages?.images||[];
return $.map(i=>[i.src.replace(/\?.+/,'?width=2000&dpr=1&s=none&crop=none'),i.caption]);
}
return this.node.parentNode?.querySelector('img')?.src?.replace(/\?.+/,'?width=2000&dpr=1&s=none&crop=none')