let m;
if($[3]==='movie'){
m=document.body.outerHTML.match(/window\.CLIENT_PARAMS\s*=\s*({.+?})<\//)?.[1];
m=m&&JSON.parse(m).initialState?.game?.movies?.results?.find(i=>RegExp(`${$[2].slice(2)}`).test(i.preview))?.data?.max;
}
return m ? m : $[1]+'/1920/'+$[2];