const use_sidebar = true

$=JSON.parse($._)
if(!$.imageUrlString)return ''
let m=[],s=$.imageServer,u=$.imageUrlString.split(';')
for(i=0;i<u.length;i++)m.push([s+u[i],(!i?use_sidebar?`<imagus-extension type="sidebar">${$.description}</imagus-extension>`:$.description:'')])
if(use_sidebar)this.TRG.IMGS_ext_data=m
return use_sidebar?{loop:'imagus://extension'}:m