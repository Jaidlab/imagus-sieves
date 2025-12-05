if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}
const res = [];

const data = JSON.parse(/id="__NUXT_DATA__">(\[.+?\])<\//.exec($._)[1]);
const guid = data.find(i=>/^(?:\w+-){4}\w+$/.test(i));
const images = data.filter(i=>/images\/goods\/.+\/96x84\//.test(i));

try {
  const custImages = JSON.parse(/customerImages:\s*(\[.+?\])/.exec(data)[1]);
  images.push(...custImages);
} catch (error) {}


for (let img of images) {
  res.push([img.replace(/\/\d+x\d+\//, '/1200x800/')]);
}

try {
  let i = 1;
  function getReviews(){
  const x = new XMLHttpRequest();
  x.open('GET', `https://bff.vseinstrumenti.ru/api/v1/reviews/group-products?sortBy=createdAt&sortDirection=desc&itemsPerPage=40&page=${i}&productGuid=${guid}`, false);
  x.withCredentials = true;
  x.send();
  const info = JSON.parse(x.responseText);

  for (let r of info.reviews) {
      if(!r.imagesV2&&!r.videos) continue;
      const text = [r.productRating + '&#11088;'];
      if (r.content.advantages) text.push('&#128077;&#127995; ' + r.content.advantages);
      if (r.content.disadvantages) text.push('&#128078;&#127995; ' + r.content.disadvantages);
      if (r.content.comment) text.push(r.content.comment);
      if (r.content.reasonToBuy) text.push(r.content.reasonToBuy);
      if(r.imagesV2)for (const img of r.imagesV2) {
      res.push(['https://cdn.vseinstrumenti.ru'+img.url.replace('{width}x{height}', '1200x800'), text.join(' | ')]);
      }
      if(r.videos)for (const vid of r.videos) {
      res.push([vid.url.replace(/(\.mp4).*/,'$1'), text.join(' | ')]);
      }
  }
i++;
if(info.reviews.length===40&&i<5)getReviews();
}
getReviews();
} catch (error) {
  console.error(error);
}

return res;