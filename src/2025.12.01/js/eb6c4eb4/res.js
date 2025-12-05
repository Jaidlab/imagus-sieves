if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}
$=$._.match(/<script id="__NEXT_DATA__" type="application\/json" nonce="[a-f0-9-]+">(.+?)<\/script>/);
$=$&&JSON.parse($[1]).props?.pageProps?.fullPageProps?.staticProps?.product?.AssetModels||[];
return $.filter(i=>i.Type==='PICTURE'&&i.Purpose!=='BADGE').map(i=>[`https://img.computerunivers.net/cp/images/${i.Width}x${i.Height}/${i.AssetId}`])