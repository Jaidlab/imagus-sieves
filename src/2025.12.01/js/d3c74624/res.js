const x=new XMLHttpRequest();
x.open('Get',$[0],false);
x.send();
$=[...x.responseText.matchAll(/data-zoom="([^"]+)/g)].map(i=>[i[1]])
return [...new Map($)]