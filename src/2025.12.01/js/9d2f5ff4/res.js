// debugger;

let rg = /\._[^./]+(?=\.)/;
if (!$[0].includes('/product-reviews')) {
    let title = ($._.match(/<title>([^<]+)<\/title>/)?.[1] || '').replace(new RegExp(`amazon\\.${$[1]}: ?`, 'i'), '');
    let data = JSON.parse($._.match(/var obj = jQuery\.parseJSON\('(.+)'\)/)?.[1] || '{}');
    let currentColor =  Object.entries(data.colorToAsin).find(([k, v]) => v.asin === data.mediaAsin)?.[0];
    let imgs = currentColor ? data.colorImages[currentColor] : Object.values(data.colorImages).flat(1);
    imgs = imgs.map(i => typeof i === 'string' ? i : (i?.hiRes || i?.large)).filter(Boolean);

    if (!imgs?.length) {
        // imgs = Array.from((new DOMParser().parseFromString($._, "text/html")).querySelectorAll('#altImages .imageThumbnail img')).map(i => i.src);
        imgs = Array.from($._.matchAll(/"hiRes":"([^"]+)"/g)).map(i => i[1]);
    }

    imgs = imgs.map(i => [i?.replace(rg, ''), title]);

    if (data.videos?.length) {
        data.videos.forEach(v => imgs.push(['', `<imagus-extension type="videojs" url="${v.url}"></imagus-extension>${v.title}`]));
    }

    this.amazon_data = imgs;
    return { loop: `https://amazon.${$[1]}/item/product-reviews/${$[2]}/ref=cm_cr_arp_d_viewopt_srt?mediaType=media_reviews_only&sortBy=helpful` };
}

const doc = new DOMParser().parseFromString($._, "text/html");
let imgs = this.amazon_data;

const distr = Array.from(doc.querySelectorAll('#histogramTable [role="progressbar"]'))
    .reverse().map(el => Number(el.attributes['aria-valuenow']?.value));
const distrKeys = [5, 4, 3, 2, 1];
imgs[0][1] =
    `<imagus-extension type="sidebar"><div>
        ${css()}
        <div class="valuation">Rating: &#11088; ${doc.querySelector('[data-hook="rating-out-of-text"]')?.innerText} &bull; ${doc.querySelector('[data-hook="total-review-count"]')?.innerText}</div>
        <div class="valuation-distr">
            <span>${distrKeys.map(k => `${k}&nbsp;&#11088;`).join('<br>')}</span>
            <span>${distrKeys.map(k => `${distr[k-1]}%`).join('<br>')}</span>
            <span>${distrKeys.map(k => `<progress max="100" value="${distr[k-1]}">${distr[k-1]}%</progress>`).join('<br>')}</span>
        </div>
        <p></p>
        ${Array.from(doc.querySelectorAll('.view-point-review, [data-hook="review"]')).map(getReviewHtml).join('')}
    </div></imagus-extension>${imgs[0][1]}`;

Array.from(doc.querySelectorAll('#cm_cr-review_list > .review')).forEach(r => {
    let text = r.querySelector('.review-text-content')?.innerText.replace('The media could not be loaded.', '').trim();
    let sbar = `<imagus-extension type="sidebar"><div>${css()}${getReviewHtml(r)}</div></imagus-extension>`;
    let imgs = Array.from(r.querySelectorAll('.review-image-container img')).map(i => [i.src.replace(rg, ''), sbar]);
    let videos = Array.from(r.querySelectorAll('[data-video-url]')).map(v =>
        ['', `<imagus-extension type="videojs" url="${v.dataset.videoUrl}"></imagus-extension>${text}`]
    );
    this.amazon_data.push(...imgs, ...videos);
});

this.TRG.IMGS_ext_data = imgs;
return { loop: 'imagus://extension' };

function getReviewHtml(el) {
    return `<p>
        <span><big>${el.querySelector('.view-point-title')?.innerText || ''}</big></span>
        <span>${el.querySelector('i.review-rating')?.outerHTML || ''}
            <b> ${(el.querySelector('.review-title > :last-child') || el.querySelector('.review-title'))?.innerText || ''}</b>
        </span>
        <span>${el.querySelector('.review-date')?.innerText || ''}</span>
        <span>${el.querySelector('.a-row.a-spacing-top-mini, [data-hook="review-body"]')?.innerText.replace('The media could not be loaded.', '')
            .trim().replace(/\s*\n\s*(?=\n)/g, '')}</span>
        <small>${el.querySelector('.review-votes, [data-hook="helpful-vote-statement"]')?.innerText.trim() || ''}</small>
    </p>`;
}

function css() {
    return `<style>
        #imagus-extension > div { display: flex; flex-direction: column; row-gap: 10px; padding-top: 6px; }
        #imagus-extension .valuation-distr { display: flex; }
        #imagus-extension .valuation-distr > * { padding: 4px 6px; border: 1px solid gray; margin: 0 -1px 0 0; text-align: right; }
        #imagus-extension p { border-bottom: 1px solid #80808080; padding: 0 0 10px; display: flex; flex-direction: column; row-gap: 6px; margin: 0; word-break: break-word; }
        #imagus-extension p span { display: flex; }
        #imagus-extension i { flex-shrink: 0; }
    </style>`;
}