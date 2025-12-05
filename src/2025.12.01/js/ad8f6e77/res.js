const ret = [];
const imgs = JSON.parse($._).collection.items;

for (let img of imgs) {
    if (!/(jpg|jpeg|png|mp4|mov)$/i.test(img.href)) continue;
    let size = /~(.+?)\./.exec(img.href)?.[1] || '';
    let text = '[' + size.toUpperCase() + '] ' + (this?.TRG?.alt || '');
    ret.push([img.href, text]);
}

return ret;