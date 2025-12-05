const use_sidebar = true // True shows caption as sidebar

var i=this.ig_embed_fail ? JSON.parse($._) : JSON.parse(JSON.parse($._.match(/s\.handle\(({.+?})\);requireLazy/)?.[1]||'{}').require?.[1]?.[3]?.[0]?.contextJSON||'{}').context?.media;
if(!i&&!this.ig_embed_fail){
this.ig_embed_fail=true;
return {loop:$[0]}
}
delete this.ig_embed_fail;
i=i.items?.[0]||i.graphql?.shortcode_media||i;
var f=i.user?.full_name||i.owner?.full_name;
var u=i.user?.username||i.owner?.username;
var t=new Date((i.taken_at||i.taken_at_timestamp)*1e3).toLocaleString('en-GB');
var c=i.caption ? i.caption.text : i.edge_media_to_caption?.edges[0]?.node?.text ? i.edge_media_to_caption.edges[0].node.text : '';
c = [`@${u}`, f&&`(${f})`, t, c].filter(Boolean).join(use_sidebar?"\n":" | ");
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