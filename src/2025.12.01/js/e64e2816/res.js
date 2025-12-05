const x = new XMLHttpRequest;
x.open('GET', `https://sutochno.ru/api/json/objects/getObject?id=${$[1]}`, false);
x.setRequestHeader('Api-Version', '1.10');
x.setRequestHeader('Token', 'Hy6U3z61fflbgT2yJ/VdlQ2719');
x.send();
const data = JSON.parse(x.responseText).data;

const res = data.object.media.map(i => [i.image_url, i.comment || '']);

const short = data.object.short_description;
const descr = data.object.properties.detail_description?.properties?.find(i => i.name === 'description').value || '';

const text = [
    `<b>${short}</b>`,
    descr,
].join('\n\n');

if (res.length) {
    res[0][1] = `<imagus-extension type="sidebar">${text}</imagus-extension>`;
}

this.TRG.IMGS_ext_data = res;
return { loop: 'imagus://extension' };