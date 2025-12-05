if(['moto','baza'].includes($[1])){
$=JSON.parse($._.match(/<script type="application\/ld\+json">([^<]+"image"[^<]+)<\//s)?.[1]||'{}');
return $.image.map((i,n)=>[i.replace('bulletin','default'),!n?[$.name,$.description].filter(Boolean).join(' | '):'']);
}
return [...new DOMParser().parseFromString($._,'text/html').querySelectorAll('[data-ftid="bull-page_bull-gallery_thumbnails"] a')].map(i=>[i.href]);