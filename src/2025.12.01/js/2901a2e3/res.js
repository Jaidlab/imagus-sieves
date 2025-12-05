if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}
let m=$._.match(/(?:"og:video" content|video src|width="100%" poster)="([^"]+)/)?.[1];
return m||[...$._.matchAll(/data-src="([^"]+)/g)].map(i=>[i[1]])