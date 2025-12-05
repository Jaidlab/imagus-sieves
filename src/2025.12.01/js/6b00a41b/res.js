let res = []
let u = [...$._.matchAll(/<a href="\/(photo\/[^"]+)/g)].map(i=>i[1])
const x = new XMLHttpRequest()
for(i=0;i<u.length;i++){
x.open('Get','https://'+($[1] ? $[1] : 'www.')+'pornhub.com/'+u[i],false)
x.send()
let t = x.responseText
res.push([t.match(/="twitter:image:src" content="([^"]+)/)[1]])
}
return res