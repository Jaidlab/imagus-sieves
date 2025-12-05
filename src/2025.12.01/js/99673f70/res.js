let imgs=this.ddg_images||[], next=this.ddg_next, n=0, o
const getJSON = u => {
const x=new XMLHttpRequest()
x.open('GET','https://duckduckgo.com/'+u+this.ddg_vqd+'#ddg_header',false)
x.setRequestHeader('Priority','u=4')
x.send()
return JSON.parse(x.responseText)
}
if($._){
if(!imgs.length){
const h=document.body.outerHTML, s=h.match(/\?(q=[^&"']+)/)[1], l=h.match(/&l=[^&"']+/)[0], p=(/\bp=-2/.test(document.cookie)?'-':'')+'1'
this.ddg_vqd=h.match(/&vqd=[^&"']+/)[0];
o=getJSON(`i.js?o=json&${s+l}&p=${p}`)
next=o.next
imgs.push(...o.results)
}
while(!imgs?.some(i=>i.thumbnail.match(/id[\/=]([^&]+)/)[1]===$[1]||i.thumbnail_token===$[2])&&next&&n<25){
n++
o=getJSON(next)
next=o.next
imgs.push(...o.results)
}
this.ddg_next=next
this.ddg_images=imgs
}
return imgs?.find(i=>i.thumbnail.match(/id[\/=]([^&]+)/)[1]===$[1]||i.thumbnail_token===$[2])?.image