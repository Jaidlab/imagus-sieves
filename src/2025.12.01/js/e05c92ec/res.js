const data = $._.split('&').map(p => p.split('='));
let title = decodeURIComponent(data.find(p => p[0] === 'title')[1]);
let url = decodeURIComponent(data.find(p => p[0] === 'fmt_stream_map')[1]);
url = url.split(',').pop().split('|')[1];

return url + '#mp4';

this.TRG.IMGS_ext_data = [['', `<imagus-extension type="videojs" url="${url}"></imagus-extension>${title}`]];
return { loop: 'imagus://extension' };