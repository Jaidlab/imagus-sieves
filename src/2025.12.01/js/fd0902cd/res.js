if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}
return [...$._.matchAll(/src="([^"]+)"+\s+alt="([^"]*)/g)].map(i=>[i[1].replace(/\/img\.|\/thumb\//g,'/').replace(/^\/[^\/]/,'//'+$[1]+'$&'),i[2]])