if($.base[0]==='d'){
const x=new XMLHttpRequest()
x.open('GET',$[0],false)
x.setRequestHeader('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')
x.send()
$._=x.responseText
}
$=$._.match(/; url=(([^"]+_image\/\d{13})\d*([^"]+))/)
return $ ? [[[$[2]+$[3],$[1]]]] : ''