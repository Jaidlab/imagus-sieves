var res = [];
const page = (new window.DOMParser()).parseFromString($._,'text/html');
const imgs = Array.from(page.querySelectorAll('#project-modules img'));
for(const img of imgs) {
    res.push([img.dataset.src || img.src]);
}

return res;