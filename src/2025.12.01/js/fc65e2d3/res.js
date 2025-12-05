const x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$=JSON.parse(x.responseText.match(/id="ng-state" type="application\/json">({.+?})<\//)[1]);
$=Object.values($).find(i=>i.b?.images)?.b.images||[];
return $.map(i=>[['#'+i.original,i.large]])