const show_images_as_album = true

let l, m=[...document.body.outerHTML.matchAll(/,url:"([^"]+)",height:\w,thumbnailUrl:"([^"]+)/g)].map(i=>i.map(x=>x.replace(/\\u002F/g,'/')));
if(l=!m.length&&this.node.closest('section')?.getAttribute('id'))return '//likey.me/'+l.replace('_','/');
if(show_images_as_album)return '//likey_album/'+m.map(i=>i[1]).join("!");
m=m.find(i=>RegExp($[1]).test(i[2]));
return m[1]||''