const isFirefox = /Firefox/.test(navigator.userAgent);
const x = isFirefox ? new content.XMLHttpRequest() : new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._ = x.responseText;

let parser = new DOMParser();
let doc = parser.parseFromString($._, "text/html");
let res = [];
if (doc.getElementsByClassName('swiper-slide').length > 0) {
[...doc.getElementsByClassName('swiper-slide')].forEach(elem => {
res.push([elem.getAttribute('data-src')])
})
} else {
res.push([doc.querySelector('.downloads a').href])
}
return res;