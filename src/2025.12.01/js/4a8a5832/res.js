let [type, ext] = JSON.parse($._.match(/_docs_flag_initialData=({.+?});/)[1])['docs-dm'].split('/');

if (type === 'video') {
    return { loop: `https://drive.google.com/get_video_info?docid=${$[1]}` };
}

if (type === 'image' || type === 'audio') {
    return `https://drive.google.com/uc?id=${$[1]}&export=download#` + (type == 'audio' ? 'mp3' : ext);
} else {
    const title = $._.match(/<title>(.+)<\/title>/)?.[1] || '';
    let eUrl = $._.match(/<meta itemprop="embedURL" content="(.+?)"/)?.[1];
    if (!eUrl) {
        if (ext == 'x-zip-compressed' || ext == 'octet-stream' || ext?.startsWith('vnd.google-apps.')) {
            eUrl = `https://drive.google.com/file/d/${$[1]}/preview`;
        } else {
            eUrl = `https://drive.google.com/uc?id=${$[1]}`;
        }
    }

    this.TRG.IMGS_ext_data = [['', `<imagus-extension type="iframe" url="${eUrl}"></imagus-extension>${title}`]];
    return { loop: 'imagus://extension' };
}