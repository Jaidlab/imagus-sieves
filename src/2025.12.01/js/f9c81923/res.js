const full_album = false // If false, usually only shows up to 60 images but loads faster. If true, shows full album but loads more slowly.

if($[3])return [[$._.match(/class="original"><a href="([^"]+)/)].map(i=>['#//'+$[2]+i[1],'//'+$[2]+i[1].replace('great','big')])]
if(!this.imgNum)this.imgNum=parseInt($._.match(/Фото <\/span>(\d+)/)[1])
if(!this.albumArray)this.albumArray=[]
if(!this.pageNum)this.pageNum=1
this.pageNum++
this.albumArray.push(...[...$._.matchAll(/<img src="(\/upload\/[^"]+)"\s+title=/g)].map(i=>[['#//'+$[2]+i[1].replace(/(img)[^\/]*/,'$1great'),'//'+$[2]+i[1].replace(/(img)[^\/]*/,'$1big')]]))
if(this.albumArray.length<imgNum&&this.pageNum<=(full_album?5:this.imgNum/12))return {loop:'//'+$[1]+'&page='+this.pageNum}
return (()=>{let m=this.albumArray;delete this.albumArray;delete this.pageNum;delete this.imgNum;return m})()