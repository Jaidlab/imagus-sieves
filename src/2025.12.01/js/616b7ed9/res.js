let m = JSON.parse(($._.match(/application\/json">({.+?})<\//)||[,'{}'])[1]).props?.pageProps.listing.photos.map(i => [i.url])
if(!m)m = [...$._.matchAll(/PhotoGallery_thumbnails__[^"]+" src="([^"]+)/g)].map(i=>[i[1].replace(/(process\.fs\.grailed\.com\/).+?\/compress/,'$1')])
return m