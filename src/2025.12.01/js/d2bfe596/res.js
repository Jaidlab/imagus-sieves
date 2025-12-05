$._=JSON.parse($._)
if($[2]==='image')return $._.files.map(i=>[`https://i.iwara.tv/image/original/${i.id}/${i.name}`])
const x=new XMLHttpRequest()
x.open('GET',$._.fileUrl,false)
x.send()
$=JSON.parse(x.responseText)
$=$.filter(i=>Number(i.name)).sort((a,b)=>b.name-a.name).map(i=>i.src.view)
return $.length ? $[0]+'#mp4' : ''