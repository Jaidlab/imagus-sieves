if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('POST',`https://www.${$[1]}/api/v1/${$[2][0]==='a'?'portfolio':$[2][0]==='m'?'model':'artwork'}/detail`,false);
x.setRequestHeader('Content-Type','application/json');
x.send(`{"id":"${$[3]}"}`);
$=JSON.parse(x.responseText).data;
return $.list ? $.list.map(i=>[i.banner.url]) : $.samples ? $.samples.map(i=>[i.url]) : $.banner.url
}
return [...$._.matchAll(/src="([^"]+)" (?:(?:width="\d+" height="\d+" )?data-v-|autoplay=)/g)].map(i=>[i[1]])