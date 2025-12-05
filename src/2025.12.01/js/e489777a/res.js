if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('Get',$[0],false);
x.send();
$._=x.responseText;
}
return $._.match(/id="big_photo" src="([^"]+)" alt="[^"]+"/)?.[1]