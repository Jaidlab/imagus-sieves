let m=[...$._.matchAll(/data-lazy="([^"]+)/g)].map(i=>[i[1]])
if(!m.length)m=JSON.parse($._.match(/id="__NEXT_DATA__"[^{]+({.+?})<\//)[1]).props?.pageProps.advert.images.photos.map(i=>[i.url])??''
return m