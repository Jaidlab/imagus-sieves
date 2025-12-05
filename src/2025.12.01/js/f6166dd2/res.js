var res = [];

const data = JSON.parse($._.match(/window\.(?:__SSR_STATE__|__PRELOADED_STATE__)\s*=\s*({.+})/)?.[1]?.replace(/:undefined/g, ':""') || '""');

let descr = data.productCard?.originalProduct?.object_info?.description || data.shell?.data?.newFlat?.objectInfoList?.description;

[
    ...data.productCard?.originalProduct?.photos || [],
    ...data.shell?.data?.newFlat?.photo || [],
    ...data.shell?.data?.newFlat?.complexPhotos || []
]
.forEach(function (item, i) {
    res.push([
        'https://img.dmclk.ru/s2000x2000q100' + (typeof item == 'string' ? item : item.url),
        i === 0 ? descr : ''
    ]);
});

return res;