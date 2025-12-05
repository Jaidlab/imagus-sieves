if ($[1]) {
  $ = JSON.parse($._);
  this.avito_images = this.avito_images || [];
  this.avito_next_page = $.nextPage;
  this.avito_images.push(...$.entries.flatMap(i => i.type === 'rating' && i.value?.images ? i.value?.images : []));
  $ = this.avito_img_src;
  delete this.avito_img_src;
  return { loop: $ };
}

let res = [];
let media = [];

const data =
  $._.match(/(?:__initialData__|__preloadedState__)">(.+?)<\/script/)?.[1] ||
  decodeURIComponent($._.match(/(?:__initialData__|__preloadedState__)\s*=\s*"(.+?)"/)?.[1]);
if (!data) console.dir($);
const data_json = JSON.parse(data);

let info;
for (const key in data_json) {
  if (key.includes('@avito/bx-item-view')) {
    info = data_json[key].buyerItem;
    break;
  }
}
media = info.galleryInfo.media;

// let hasVideo = false;
for (imgs of media) {
  if (imgs.isVideo) {
    // hasVideo = true;
    if (imgs.embededUrl.startsWith('//')) imgs.embededUrl = 'https:' + imgs.embededUrl
    // if (imgs.embededUrl.includes('youtube.com')) {
    // 	res.push(['', `<imagus-extension type="iframe" url="${imgs.embededUrl}"></imagus-extension>`]);
    // } else {
    res.push(['', `<imagus-extension type="videojs" url="${imgs.embededUrl}"></imagus-extension>`]);
    // }
    continue;
  }

  let best_quality = 0;
  let best_videoUrl = '';
  for (imgSize in imgs.urls) {
    let isa = imgSize.split('x');
    let quality = parseInt(isa[0]) * parseInt(isa[1]);
    if (quality > best_quality) {
      best_quality = quality;
      best_videoUrl = imgs.urls[imgSize];
    }
  }
  if (best_quality != 0) {
    res.push([best_videoUrl, '']);
  }
}

let sidebar_html = 
  `<style>td { padding: 0 10px 2px 0; }</style>` +
  `<table>` +
    (info.paramsBlock?.items || []).map(i => `<tr><td>${i.title}</td><td>${i.description}</td></tr>`).join('') +
  `</table><br><br>` +
  info.item.description;

const sbIndx = res[0][1].startsWith('<imagus-extension') ? 1 : 0;
res[sbIndx][1] = `<imagus-extension type="sidebar">${sidebar_html}</imagus-extension>${res[sbIndx][1]}`;
this.TRG.IMGS_ext_data = res;

return 'imagus://extension';