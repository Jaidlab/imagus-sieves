$=[...new DOMParser().parseFromString($._,"text/html").getElementById('gallery-big').querySelectorAll('img[src],source[src],iframe[src]')];
if($.some(i=>i.nodeName==='IFRAME')){
this.TRG.IMGS_ext_data=$.map(i=>i.nodeName==='IFRAME'?['',`<imagus-extension type="iframe" url="${i.src}"></imagus-extension>`]:[i.src,'']);
return {loop:'imagus://extension'}
}
return $.map(i=>[i.src])