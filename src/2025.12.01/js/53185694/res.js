const lower_quality_first = false // true shows lowest quality video first. Press TAB to switch to highest quality.

let l=lower_quality_first, res=[];
let vh=$._.match(/"video":"(\w+)","div":"videoPlayer"/i)[1];
let x=new XMLHttpRequest();
x.open('GET','https://rumble.com/embedJS/u3/?request=video&ver=2&v='+vh,false);
x.send();
let js=JSON.parse(x.responseText);
let media = Object.values(js.ua.mp4)?.sort((a,b)=>a.meta.h-b.meta.h);
return media ? [[[(!l?'#':'')+media.pop().url,(!l?'':'#')+media?.[0]?.url]]] : ''