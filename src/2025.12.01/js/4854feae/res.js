const x=new XMLHttpRequest();
x.open('Get',$[0],false);
x.send();
$=JSON.parse(x.responseText.match(/"__NEXT_DATA__" type="application\/json">(.+?)<\/script/)[1]).props.initialState;
const id=$['product-module'].id;
return $['products-store-module'].products[id].images.map(i=>['https://static.eldorado.ru'+i.url])