console.log('Page source:',$._)
$=$._.match(/<script type="application\/ld\+json">\n({.+?})\n</s)
$=$&&JSON.parse($[1]).mainEntity
this.CNT.filename=($.author?.name+' - '+$.name?.match(/[^.]+/)?.[0]).replace(/[^\w\s.-]/g,'_')
return $.contentUrl