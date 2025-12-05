const r = [];

if($._[0] === '{'){
const data = JSON.parse($._).data;
r.push([data?.skuInfo?.propertyList?.[0]?.values?.[0]?.imageMainUrl?.replace(/_\d+x\d+\..+/,'')]);
data.gallery?.forEach(i=>r.push([i.videoUrl||i.imageUrl,data.description]));
} else {
let json = $._.match(/Data\s*=\s*([^;]+)/)?.[1];
json = json ? JSON.parse(json).imagePathList : [];
json.forEach(i=>r.push([i,'']))
}
try {
    const page = (new window.DOMParser()).parseFromString($._,'text/html');
    let imgs = Array.from(page.querySelectorAll('div[class^="gallery_Gallery__picture"] > picture > img, div[class^="gallery_Gallery__video"] > video'));
    if (imgs.length<1) {
      imgs = Array.from(page.querySelectorAll('div[class^="Product_GalleryBarItem"] > img, div[class^="ProductDescription-module_wrapper"] img'));
    }
    for (const i of imgs) {
        // filter out images inside links
        if (i.parentElement.nodeName === 'A') continue;
        let url = i.attributes.src.value.replace(/_\d+x\d+\.(jpe?g|png)$/, '');
        url = url.replace('`','');
        r.push([url, '']);
    }
    const id = $[4];
    const review_json=JSON.parse($._.match(/"reviews":(\[.+?\]),"resolveParams"/)?.[1]||'{}');
    if(!review_json?.[0]){
    const x = new XMLHttpRequest;
    x.open('GET', 'https://feedback.aliexpress.com/pc/searchEvaluation.do?productId='+id+'&page=1&pageSize=50', false);
    x.send();
    JSON.parse(x.responseText).data.evaViewList.forEach(f=>{
      f.images.forEach(p => r.push([p,f.buyerFeedback]));
    });
  } else {
  review_json.forEach(i=>i.root?.images?.forEach(x=>r.push([x.url,i.root?.text])));
  }

} catch (e) {}

return r;