const res = [];
var data = JSON.parse($._.match(/{.+"vehicle_id".+}/));
var text = '';

res.push([data.hero]);

data.content.forEach(c => {
    if (c.attributes?.content) text += c.attributes.content + '\n';
    if (c.attributes?.images?.startsWith('[{')) {
        c.attributes.images = JSON.parse(c.attributes.images);
        c.attributes.images.forEach(i => {
            res.push([i.image]);
        });
    }
})

if (data.media?.length) {
    data.media.forEach(m => {
        if (!res.includes(m.original_url)) res.push([m.original_url]);
    });
}

res[0][1] = `<imagus-extension type="sidebar">${text}</imagus-extension>${data.title}`
this.TRG.IMGS_ext_data = res
return { loop: 'imagus://extension' }