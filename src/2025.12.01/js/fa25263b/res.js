const use_sidebar = true

let id=$[2], token=location.hostname==='www.instagram.com'&&document.cookie.match(/csrftoken=([^;]+)/)?.[1], x=new XMLHttpRequest();
// #instagram_header is added to URL to match SMH rules
if(!token){
x.open('GET',$[0]+'#instagram_header',false);
x.send();
token=x.responseText.match(/"csrf_token":"([^"]+)/)?.[1], id=$[1]==='share/' ? x.responseText.match(/"shortcode":"([^"]+)/)?.[1]||$[2] : $[2];
}
x.open('POST','https://www.instagram.com/graphql/query/#instagram_header',false);
x.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
x.setRequestHeader('X-CSRFToken',token);
x.send(`variables=%7B%22shortcode%22%3A%22${id}%22%7D&doc_id=8845758582119845`);
var i=JSON.parse(x.responseText).data.xdt_shortcode_media;
var f=i.user?.full_name||i.owner?.full_name;
var u=i.user?.username||i.owner?.username;
var t=new Date((i.taken_at||i.taken_at_timestamp)*1e3).toLocaleString('en-GB');
var c=i.caption ? i.caption.text : i.edge_media_to_caption?.edges[0]?.node?.text ? i.edge_media_to_caption.edges[0].node.text : '';
c = [`@${u}`, `(${f})`, t, c].join(use_sidebar?'\n':' | ');
c = use_sidebar ? `<imagus-extension type="sidebar">${c}</imagus-extension>` : c;
let m;
if (i.carousel_media) m = i.carousel_media.map(x => [x.video_versions ? x.video_versions[0].url : x.image_versions2.candidates[0].url, c])
else if (i.video_versions) m = [i.video_versions[0].url, c];
else if (i.edge_sidecar_to_children) m = i.edge_sidecar_to_children.edges.map(i=>[i.node?.video_url||i.node?.display_url, c])
else if (i.video_url||i.display_url) m = [i.video_url||i.display_url, c]
else m = [i.image_versions2.candidates[0].url, c]
this.CNT.filename = u + '_' + (Array.isArray(m[0])?m[0][0]:m[0]).match(/\/([^\/.]+\.\w{3,4})(?:$|\?)/)?.[1].replace(/[^\w.-]/g,'_')||''
if(use_sidebar)this.TRG.IMGS_ext_data=m;
return use_sidebar?{loop:'imagus://extension'}:m