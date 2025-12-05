var jsn=JSON.parse($._.match(/window\['__natgeo__'\]=(.+);<\/script>/i)[1]);
var edgs=jsn.page.content.prismarticle.frms[0].mods;
var res=[];
var img=$._.match(/"og:image" content="([^"]+)/);
edgs.forEach(customFilter);
 
function customFilter(item){
 if(item?.hasOwnProperty('image'))
 res.push([item.image.src]);
 for (var i=0; i<Object.keys(item||[]).length; i++){
 if (item&&typeof item[Object.keys(item)[i]] == "object"){
 customFilter(item[Object.keys(item)[i]]);
 }
 }
}
if(img)res.unshift([img[1].replace(/_\d+x\d+\.([^?]+).*/,'.$1')])
return [...new Map(res.filter(i=>i[0]))];