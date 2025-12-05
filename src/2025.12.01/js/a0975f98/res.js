if($[2]!=='art'){
 const x=new XMLHttpRequest()
 x.open('GET',`https://www.${$[1]+$[2]}/video${$[3]}`,false)
 x.setRequestHeader('X-Requested-With','XMLHttpRequest')
 x.send()
 $=JSON.parse(x.responseText).sources
 $=Object.entries($).sort((a,b)=>parseInt(a[0])-parseInt(b[0])).map(i=>i[1][0].src)
 return $?.length ? [[['#'+$.pop(),$?.[0]]]] : ''
}
let t=$._.match(/="og:title" content="([^"]+)/)?.[1]|'', m=[...$._.matchAll(/"ng-img-container-sync art-item-container"><a href="([^"]+)/g)]
return m.map(i=>[i[1],t])