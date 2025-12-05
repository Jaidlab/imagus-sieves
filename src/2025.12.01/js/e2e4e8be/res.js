const x=new XMLHttpRequest(), o=JSON.parse($._.match(/window\.project_config\s*=\s*([^;]+)/)[1]).servers.production.translateProxy, url=`https://${o.host}:${o.port}/`, vid=$[1];
const getJSON=(path,param)=>{
console.log('Function:',path,param)
x.open('POST',url+path,false);
x.setRequestHeader('Content-Type','application/json;charset=utf-8');
x.send(JSON.stringify(JSON.parse(param)));
console.log('Response:',x.responseText.slice(0,40))
return JSON.parse(x.responseText);
}
$=getJSON('rpc/getrawtransactionwithmessagebyid',`{"parameters":[["${vid}"]],"method":"getrawtransactionwithmessagebyid"}`).data[0].u;
console.log('POST URL',$)
const id=$.includes('%')?decodeURIComponent($):$;
$=getJSON('peertube/videos',`{"urls":["${id}"]}`).data?.[id];
const t=[$?.publishedAt&&new Date($.publishedAt).toLocaleString(),$?.description?.replace(/[^\n]+\n/,'')].filter(Boolean).join(' | ');
$=$?.streamingPlaylists[0]?.playlistUrl;
console.log('Media URL:',$)
this.TRG.IMGS_ext_data=['//data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>',`<imagus-extension type="videojs" url="${$}"></imagus-extension>${t}`];
return $?{loop:'imagus://extension'}:''