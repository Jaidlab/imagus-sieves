if(!this.rg_auth)this.rg_auth=$._[0]==='{' ? JSON.parse($._).token : JSON.parse(localStorage.getItem('session_data')).token
let x=new XMLHttpRequest()
x.open('GET','https://api.redgifs.com/v2/gifs/'+$[1].toLocaleLowerCase()+'?_redgifs_headers_',false)
x.setRequestHeader("Authorization","Bearer "+this.rg_auth)
x.send()
if(x.status!==200){
if(!this.rg_auth_fail&&location.hostname==='www.redgifs.com'){
this.rg_auth_fail=true
delete this.rg_auth
return {loop:$[0]}
}
return null
}
const jsn=JSON.parse(x.responseText).gif, t=[jsn.tags.join(", ").replace(/.+/,'[$&]'),jsn.userName,new Date(jsn.createDate*1000).toLocaleString(),jsn.description].filter(Boolean).join(" | ")
if(!jsn.gallery){
return [[['#'+jsn.urls.hd,jsn.urls.sd],t]]
}else{
x.open('GET','https://api.redgifs.com/v2/gallery/'+jsn.gallery+'?_redgifs_headers_',false)
x.setRequestHeader("Authorization","Bearer "+this.rg_auth)
x.send()
return JSON.parse(x.responseText).gifs.map((i,n)=>[i.urls.hd,(!n?t:'')])
}