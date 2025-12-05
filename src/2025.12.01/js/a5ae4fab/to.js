if (!this.getImages_original) {
    this.getImages_original = this.getImages;
    this.getImages = (el) => this.getImages_original(el?.firstElementChild?.nodeName == 'IMG' ? el.firstElementChild: el);
}

if ($[2]?.startsWith('video')) {
    if (!$[2].includes('-')) $[2] += '-7';
    let id = /[0-9A-Z]{20,}/.exec($[0])[0];
    return `https://v.ozone.ru/vod/${$[2]}/${id}/master.m3u8`;
} else {
    return $[1] + $[3];
}