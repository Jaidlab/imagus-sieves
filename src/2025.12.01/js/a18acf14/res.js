const f=this.find, x=new XMLHttpRequest()
x.open('GET',$[0],false)
x.send()
$._=x.responseText
let m=[...$._.matchAll(/data-original="([^"]+)/g)].map(i=>[f({src:i[1]})])
if(!m?.length)m=$._.match(/itemprop="image" src="([^"]+)/)?.[1]
return m||''