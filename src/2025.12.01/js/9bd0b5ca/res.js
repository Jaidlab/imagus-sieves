if($.base[0]==='d'){
const x=this._CF_ ? new content.XMLHttpRequest() : new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
if(!this._CF_&&platform.firefox&&/window\._cf_chl_opt/.test(x.responseText)){
this._CF_=true;
return {loop:$[0]}
}
$._=x.responseText;
}
$=new DOMParser().parseFromString($._,'text/html').getElementsByClassName('bh-preloaded-data')?.[0].getAttribute('data-data');
$=JSON.parse($).ServerStateStore.state;
$=$.entries[$.updated[0]].data[0].imageInfo.images[0].images;
return $.map(i=>{i=i.largeImages;return [['#'+i.pop()?.url,i.find(x=>x.width==1000)?.url]]})