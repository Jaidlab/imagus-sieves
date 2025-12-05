const r = []
try {
    if (!$[0].includes('/reviews')) {
        const doc = new DOMParser().parseFromString($._, "text/html");
        const title = doc.querySelector('title').textContent;

        // product images
        let data = JSON.parse(doc.querySelector('div[id^="state-webGallery-"]').dataset.state);
        data.images?.forEach(i => r.push([i.src, i.alt || title]));
        data.videos?.forEach(v => r.push([v.url, v.name || title]));
    }

    // reviews images
    const rUrl = 'https://www.ozon.ru/api/composer-api.bx/widget/json/v2?widgetStateId=webReviewGallery-2954366-pdpPage1column-1', pUrl = $[0].match(/[^?]+/)?.[0], rId = $._.match(/reviewVuuid=([^"]+)/)?.[1], key = btoa(`{"url":"${pUrl.replace(/^https?:\/\/[^\/]+/,'')}?layout_container=pdpPage1column&layout_page_index=1","ci":{"vertical":"rpProduct","name":"webReviewGallery","params":[{"name":"reviewGalleryElementsLimit","int":50},{"name":"showVideosParam","bool":true},{"name":"paramSeoMode"},{"name":"isEnableNewHarvestBadge","bool":true},{"name":"sortingType","text":"videos_first_asc"},{"name":"showTrialPinParam","bool":true},{"name":"withCanceled","text":"offCanceled"},{"name":"withBadgeCanceled","text":"offBadgeCanceled"}],"version":2,"layoutID":11855,"id":2954366}}`);
    const x = new XMLHttpRequest;
    x.open('POST', rUrl, false);
    x.send(`{"asyncData":"${key}","extraBody":{},"url":"${pUrl}reviewVuuid=${rId}&reviewsVariantMode=2","componentName":"${pUrl}reviewVuuid=${rId}&reviewsVariantMode=2"}`);
    const data = JSON.parse(x.responseText);

    Object.values(data.state.reviews).forEach(f => {
        const c = f.content;
        [...c.photos||[], ...c.videos||[]].forEach(p => {
            const text = ['&#11088;' + c.score];
            if (c.comment) text.push(c.comment);
            if (c.positive) text.push('&#128077;&#127995; ' + c.positive);
            if (c.negative) text.push('&#128078;&#127995; ' + c.negative);
            if (f.createdAt) text.push(new Date(f.createdAt*1000).toISOString().substring(0,10))
            r.push([p.url, text.join(' | ')]);
        });
    });
} catch (e) {
    console.error(e);
}

let hasVideo = false;
r.forEach(item => {
    if (item[0].endsWith('.m3u8')) {
        hasVideo = true;
        item[1] = `<imagus-extension type="videojs" url="${item[0]}"></imagus-extension>${item[1]}`;
        item[0] = '';
    }
});
if (hasVideo) {
    this.TRG.IMGS_ext_data = r;
    return { loop: 'imagus://extension' };
}

return r;