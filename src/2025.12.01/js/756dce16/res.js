var res = [];
const page = (new window.DOMParser()).parseFromString($._,'text/html');
const imgs = Array.from(page.querySelectorAll('#pictures-list img, #review-body img'));
for (const img of imgs) {
    const src = (img.dataset.src || img.src)?.replace(/\/-\w+\//, '/');
    if (/jpe?g$/.test(src)) res.push([src]);
}

return res;