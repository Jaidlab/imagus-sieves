let r=[], link='https://www.'+$[1]+$._.match(/<a name="\d+" href="([^"]+)/)?.[1].replace(/&amp;/g,'&');
for(i=0;i<240;i+=24){
 let imgs, x=new XMLHttpRequest();
 x.open('GET',link+'&idx='+i+'&partial=true',false);
 x.send();
 imgs=[...x.responseText.matchAll(/original="([^"]+)/g)].map(i=>[i[1]]);
 r.push(...imgs);
 if(imgs.length<24)break;
}
return r;