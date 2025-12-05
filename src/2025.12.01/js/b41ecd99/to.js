let id, img, imgs = [],
  n = this.node,
  img_url = 'https://' + $[0];
if (!n.className?.startsWith('style-imageWrapper-')) return $[0];
if (id = !this.avito_images && new URL(location.href)?.searchParams?.get('sellerId')) {
  this.avito_img_src = img_url;
  return 'https://www.avito.ru/web/5/user/' + id + '/ratings?limit=100';
}
imgs = this.avito_images;
img = imgs.find(i => Object.values(i).some(x => x === img_url)) || '';
if (!img && this.avito_next_page?.length) {
  this.avito_img_src = img_url;
  return 'https://www.avito.ru' + this.avito_next_page;
}
return img['1280x960'] || '';