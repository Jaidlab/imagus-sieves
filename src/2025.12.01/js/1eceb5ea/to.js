const n=this.node;
if($[2]&&!n.closest('[class^="fotorama__"]'))return $[1]+$[2]+'1920px';
let o, i;
if($[3]){
if(!this.hardwareluxx_json){
this.hardwareluxx_json=[];
const m=JSON.parse(document.body.outerHTML.match(/console.log\((.+?)\)</)?.[1]||'[]');
m.forEach(i=>this.hardwareluxx_json.push({"local_url_org":i.local_url_org,"renditions":i.renditions}));
}
o=this.hardwareluxx_json;
i=o?.findIndex(x=>Object.values(x.renditions).some(y=>y.id===$[3]));
}else{
o=[...(n.closest('[class="fotorama__nav__shaft fotorama__grab"]')||n.closest('[class^="fotorama__wrap"]').querySelector('[class="fotorama__nav__shaft fotorama__grab"]')||[]).querySelectorAll('img[src]')];
i=o?.findIndex(x=>RegExp($[2]).test(x.src));
}
return o&&i>-1?'hardwareluxxalbum/'+i+'!'+o.map(i=>i.local_url_org||i.src?.replace(/_\d+px/,'_1920px')).join('!'):$[0].replace(/_\d+px/,'_1920px')