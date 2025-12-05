const max_images = 300 // Number of images in album. Lower number loads faster

const x=new XMLHttpRequest(), n=$[1][0].toUpperCase()+$[1].slice(1), h=$[1][0]==='t'?'990fff77afa2cc2ecb8a245e9c124f994eb21a4cbab130ae0a280b9f3117b7c7':'457690e6ddeba1d01d3f62eca1f5d9fe59f4aba207807c5703836d0dea714460';
x.open('GET',`https://api.graphql.imdb.com/?operationName=${n}Images&variables=%7B%22first%22%3A${max_images}%2C%22firstYes%22%3Atrue%2C%22id%22%3A%22${$[2]}%22%2C%22lastYes%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%22${h}%22%2C%22version%22%3A1%7D%7D`,false);
x.setRequestHeader('Content-type','application/json');
x.send();
$=JSON.parse(x.responseText).data?.[$[1]]?.images?.edges||[];
return $.map(i=>[i.node?.url?.replace(/\._.*/,''),i.node?.caption?.plainText||''])