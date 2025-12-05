if($.base[0]==='d'){
const x=new XMLHttpRequest()
x.open('GET',$[0],false)
x.send()
$._=x.responseText
}
return $._.match(/id="image-zoom" href="([^"]+)/)?.[1]||''