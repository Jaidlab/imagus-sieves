if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}
if($[1]==='album')return [...$._.matchAll(/<a href="([^"]+)" class="item"/g)].map(i=>[i[1]]);
$=$._.match(/video_url: '([^']+)/);
return $?$[1]+'#mp4':''