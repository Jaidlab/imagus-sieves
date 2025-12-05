if (!this.styleAdded && document.URL.includes('/feedbacks')) {
    const style = document.createElement("style")
    style.textContent = `
        .sw-slider-thumbs-gallery .gallery-set .gallery-set__item::before { z-index: 0 !important; }
        .gallery-set__list > li > img.hide-desktop { display: block !important;}
    `
    document.head.appendChild(style)
    this.styleAdded = true;
}

if ($[1]) {
	return `${$[1]}/fs.webp`
} else if ($[2]) {
	return `${$[2]}/big/${$[3]}`
} else if ($[4]) {
    return `${$[4]}/index.m3u8`
}