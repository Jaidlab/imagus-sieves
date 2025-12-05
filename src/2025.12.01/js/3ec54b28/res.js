const p_id=location.pathname.match(/profile\/([^\/]+)/)?.[1], id=p_id&&JSON.parse(document.body.outerHTML.match(/window\.APP_DATA=({.+?})</)?.[1]||'{}').appState?.page?.profiles?.[p_id].albums?.edges?.find(i=>RegExp($[1]).test(i.node?.preview?.url))?.node.id;
if(id){
const x=new XMLHttpRequest();
x.open('POST','https://profi.ru/graphql/',false);
x.setRequestHeader('Content-Type','application/json');
x.send(`{"query":"#prfrtkn:warp:a8865a86e38692e39fec728d3ef9f77a5d35c855:5e9c26e229d4481765885051c3a2a5d182618493\\nquery albumImagesQuery($albumId: Int!, $photoWidth: Int!) {\\npfilesByAlbumId(albumId: $albumId) {\\nedges {\\nnode {\\nsrc: url(transform: {type: PROFI_BY_WIDTH, width: $photoWidth})\\nalt: titleSeo\\ntitle\\ntype\\nservices {\\nname\\n}\\ncreated {\\nrelativeDate\\n}\\n}\\n}\\n}\\n}","variables":{"albumId":${id},"photoWidth":"1500"}}`);
$=JSON.parse(x.responseText);
return $.data.pfilesByAlbumId.edges.map(i=>[i.node.src.match(/^[^-]+/)[0]]);
}
$._=[...this.node.closest('[class="ui_1sbvG ui_2ilRy ui_TEhAC"],[class="ui_P7Hoq"],[class="ui_P7Hoq ui_XcgaS"]')?.querySelectorAll('img[src]')||[]].map(i=>[i.src.match(/^[^-]+/)[0]]);
const i=$._.findIndex(([i])=>RegExp($[1]).test(i));
return i>=0 ? {"":$._,idx:i} : '//'+$[1]