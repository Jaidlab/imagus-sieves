if(!$[2]&&$[1][0]==='G'){
let m=[];
function getVid(u){
const x=new XMLHttpRequest();
x.open('GET',u,false);
x.send();
return x.responseText.match(/__fileurl = '([^']+)/)?.[1];
}
$._=[...new DOMParser().parseFromString($._,'text/html').querySelectorAll('div [class^="desktop-thumb "]')];
$._.forEach(i=>{i=i.getAttribute('data-mediatype')==='video' ? getVid(i.querySelector('a').href) : i.querySelector('img[class="static"]')?.src?.replaceAll('thumb','image').replace('-zoom','');i&&m.push([i])});
return m
}
return $._.match(/__fileurl = '([^']+)/)?.[1]||''