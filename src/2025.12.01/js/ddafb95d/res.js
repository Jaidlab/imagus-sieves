if(!$[1]){
if(!this.gallery)this.gallery=[]
if(!this.ls)this.ls=0
this.gallery.push(...[...$._.matchAll(/<a class="no_ajax" href="([^"]+)/g)].map(i=>[i[1]]))
if(/<link rel="next" href="/.test($._)&&this.ls<25){
this.ls++
return {loop:$._.match(/<link rel="next" href="([^"]+)/)[1]}
}else{
let a = this.gallery
delete this.gallery
delete this.ls
return a
}
}else{
$=[...$._.matchAll(/<source src=\\"([^"]+)/g)]
const l=Math.floor($.length/2)-1
return [[$.flatMap((i,n)=>!n||n===l?(!n?'#':'')+i[1].replace(/\\/g,''):[])]]
}