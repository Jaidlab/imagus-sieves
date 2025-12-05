let meta = document.querySelector('head > meta[name="referrer"]');
if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'same-origin';
    document.getElementsByTagName('head')[0].appendChild(meta);
} else if (meta.attributes.content.value !== 'same-origin') {
    meta.attributes.content.value = 'same-origin';
}
let url = ($._.match(/<img id="imgpreview" src="([^"]+)"/) || [])[1];
return [url];