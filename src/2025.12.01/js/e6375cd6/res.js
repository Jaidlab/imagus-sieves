$=$._.match(/id="__NUXT_DATA__">(\[.+?\])<\//);
$=$&&JSON.parse($[1])||[];
return $.flatMap(i=>typeof i==='string'&&i.startsWith('https://image.tensorartassets.com/posts/images/')?[[i]]:[])