const title = $._.match(/<h1>(.+)<\/h1>/)?.[1] || '';
const vidRe = `(?:<source src="([^"]+)" type='video\/mp4)`;
const imgRe = `(?:lasyload" data-src="([^"]+))" src="data:image`;
const re = new RegExp(`${vidRe}|${imgRe}`, 'g');

const matches = [...$._.matchAll(re)].map(m => m?.[1] || m?.[2]);
if (!matches.length) return;

let result = Array.from(new Set(matches));
result = result.map((item, idx) => [
  item,
  `${title} - ${idx + 1} of ${result.length}`,
]);
return result;