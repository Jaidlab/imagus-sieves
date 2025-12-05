if($.base[0]==='d'){
let c, x=new XMLHttpRequest();
const d=()=>document.cookie='nsfw_inter=;Path=/;max-age=0';
try{
if(c=location.hostname==='www.imagebam.com'&&!/nsfw_inter/.test(document.cookie))document.cookie='nsfw_inter=1; Path=/';
// #imagebam_header added to match SMH rules
x.open('GET','https://www.'+$[1]+($[3] ? $[2]+$[3] : $[1]+'image'+$[2])+'#imagebam_header',false);
x.send();
if(c)d();
$._=x.responseText;
}catch(e){
if(c)d();
return {loop:'https://www.'+$[1]+'image'+($[3]||$[2])+'?loop'};
}
}
return $._.match(/img src="([^"]+)" alt="[^"]+" class="main-image/)?.[1]