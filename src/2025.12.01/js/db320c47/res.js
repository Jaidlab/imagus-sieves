let newUrl = $._.match(/window\.location\.replace\("(.+?)"\)/)?.[1] || $[0];
newUrl = newUrl.replace(/(\/reviews)?\?/, '/reviews?');

let x = new XMLHttpRequest;
x.open('GET', newUrl, false);
x.send();
$._ = x.responseText + $._;
const page = new DOMParser().parseFromString($._, "text/html");

// product images
let isVideo = (o => o?.video || o?.entity === "yandex_video");
let hasVideo = false, data = JSON.parse($._.match(/({"widgets":{"@card\/MediaViewer(?:Gallery|Manager)":{"\/content\/page\/fancyPage\/(?:defaultPage\/)?mediaViewer.+?})<\/noframes>/)[1]);
let imgs = [];
Object.values(data.collections.mediaItem).forEach(o => {
    let origImg = isVideo(o) ? ['',`<imagus-extension type="videojs" url="${o.streams?.[0]?.url}"></imagus-extension>${o.title||''}`] : o.origUrl ? [o.origUrl] : '';
        if (isVideo(o)) hasVideo = true;
        // skip duplicates
        if(origImg&&!o.picture&&!imgs.find(i => i[0]?.[0] == origImg))imgs.push(origImg);
});

// gallery
let mediaInfo;
try {
    mediaInfo = JSON.parse($._.match(/>({"widgets":{"@MarketNode\/UgcMediaGallery".+?})<\//)?.[1]);
} catch (error) {}

// reviews
if (mediaInfo?.collections?.review) {
    for (const r of Object.values(mediaInfo.collections.review).reverse()) {
        r.photos.forEach(p => {
            const text = ['&#11088;' + r.averageGrade];
            if (r.comment) text.push(r.comment);
            if (r.pro) text.push('&#128077;&#127995; ' + r.pro);
            if (r.contra) text.push('&#128078;&#127995; ' + r.contra);
            if (r.created) text.push(new Date(r.created).toISOString().substring(0,10))
            imgs.push([`https://avatars.mds.yandex.net/get-${p.namespace}/${p.groupId}/${p.imageName}/orig`, text.join(' | ')]);
        })
    }
}

let userImgs = [...page.querySelectorAll('[data-zone-name="ugc-media-gallery"] img')].map(i => i.src.replace(/\/\d+x\d+$/, '/orig'));
for (const ui of userImgs) {
    if (!imgs.find(i => i[0] == ui)) {
        imgs.push([ui, 'User Image']);
    }
}

// videos
if (mediaInfo?.collections?.ugcvideo) {
    let vidInfo = Object.values(mediaInfo?.collections?.ugcvideo);
    for (const img of imgs) {
        // let id = i[0].match(/\/get-vh\/\d+\/(\w+)\//)?.[1];
        if (!img[0].includes('/get-vh/')) continue;
        let info = vidInfo.find(v => v.metaInfo?.thumbnail == img[0]);
        if (!info) continue;
        hasVideo = true;
        img[1] = `<imagus-extension type="videojs" url="${info.metaInfo.streamUrl}"></imagus-extension>${info.title}`;
        img[0] = '';
    }
}

if (hasVideo) {
    this.TRG.IMGS_ext_data = imgs;
    return { loop: 'imagus://extension' };
}

return imgs;