if($[2]!=='img')return [...$._.matchAll(/<img src="([^"]+)\.md([^"]+)/g)].map(i=>[i[1]+i[2]]);
if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('GET',`https://${$[1]}/oembed/?url=https%3A%2F%2F${$[1]}%2Fimg%2F${$[3]}&format=json`,false);
x.send();
$._=x.responseText;
}
return $._[0]==='{'&&JSON.parse($._).url?.replace(/\.\w{2}\./,'.')||this.node?.src?.replace('.md.','.')||''