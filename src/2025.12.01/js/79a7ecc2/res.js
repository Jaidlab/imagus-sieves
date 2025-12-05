const x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
return [...x.responseText.matchAll(/"1200x900n":"([^"]+)/g)].map(i=>[[['#'+i[1].replace('1200x900n','orig'),i[1]]]])