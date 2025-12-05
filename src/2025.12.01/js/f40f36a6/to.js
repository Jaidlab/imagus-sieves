if(!$[1])return $[0].slice(0,-9)+'0&h=0'

const original_img_url = decodeURIComponent($[1]);
const inner_html = this.TRG.parentNode.innerHTML.replace(/&amp;/g, '&');
const yandex_thumb_url = inner_html.match(/avatars\.mds\.yandex\S+n=13|yandex-images\.clstorage\.net\/[^"]+/)?.[0]||'';

return original_img_url + '\n' + yandex_thumb_url;