if($[2]?.[0]==='g'){
const n=this.node.src?.match(/^[^?]+/)[0];
$._=JSON.parse($._).data?.user?.edge_highlight_reels?.edges?.find(i=>i.node?.cover_media_cropped_thumbnail?.url?.match(/^[^?]+/)[0]===n)?.node?.id;
}
if(!$._)return !1;
let x=new XMLHttpRequest();
x.open('GET', `https://www.${$[1]}api/v1/feed/reels_media/?reel_ids=highlight%3A${$._}`, false);
x.setRequestHeader('X-IG-App-ID','936619743392459');
x.send();
x=x.responseText[0]==='{'&&JSON.parse(x.responseText).reels?.['highlight:'+$._]?.items;
return x ? x.map(i=>[i.video_versions?.[0]?.url||i.image_versions2?.candidates[0].url]) : !1