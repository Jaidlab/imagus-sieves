const max_resolution = 1080
const low_resolution_first = false

if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('Get',$[0],false);
x.send();
$._=x.responseText;
}
if(!$[2])return {loop:JSON.parse($._.match(/mediaDefinition:\s*(\[[^\]]+mp4[^\]]+\])/)[1]).find(i=>i.format==='mp4').videoUrl.replace(/^\//,'//'+$[1]+'.com/')}
$=JSON.parse($._).filter(i=>i.quality<=max_resolution)
return [[[(!low_resolution_first?'#':'')+$.pop().videoUrl,(!low_resolution_first?'':'#')+$[Math.floor($.length/2)]?.videoUrl]]]