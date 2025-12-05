const re =  /(?:class="thumbnail"\n<)?img(?: class="thumbnail")? src="(?<img>[^"]+)/g
return [...$._.matchAll(re)].map(m => [m.groups.img.replace("thumbs", "images"), ""]);