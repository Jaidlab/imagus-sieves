if(/4shared\.com\/all-images\//.test($.base)){
if(!this.array){this.array = []}
this.array.push(...[...$._.matchAll(/<img class="jsImageThumbnailLink" src="([^"]+)/g)].map(i=>[i[1]]));
return /<a class="jsAllImagesNext submit-gray no-line" href="/.test($._) ? {loop:'https://www.4shared.com'+$._.match(/<a class="jsAllImagesNext submit-gray no-line" href="([^"]+)/)[1]} : (()=>{const res = this.array; delete this.array; return res})();
} else {
return $._.match(/(?:<img id="zoom_image" src="|[^{]file: ')(https:\/\/[^.]+\.4shared\.com\/img\/[^'"]+)/)[1]
}