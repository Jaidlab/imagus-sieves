if($[1])return [...$._.matchAll(/data-hq="([^"]+)/g)].map(i=>[i[1]]);
if(!$[2]){
const m=$._.match(/data-hq='([^']+)/);
if(m)return m[1];
const id=$._.match(/data-id='([^']+)/);
return id?{loop:'//gazeta-ru-video/'+encodeURIComponent(id[1])}:''; 
}
$=JSON.parse($._).result?.playList?.source;
return $?{loop:$}:''