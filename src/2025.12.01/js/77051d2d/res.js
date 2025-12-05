const re = /"ImageObject","contentUrl":"(?<img>[^"]+)/g;
const m = $._.matchAll(re);
return [...m].map((el) => [el.groups?.img, '']);