var n=this.node, p = n.parentNode, q = p&&p.parentNode; q = q && q.querySelector('.bz_attach_extra_info,.attach-info');
let ext = /[.\/](jpe?g|png|gif|bmp|web[mp]|svg|mp4|ogv)(?:[\n\s]|$)/i.exec(n.title || n.textContent)?.[1];
return q && ~q.textContent.indexOf('image/') || ext || n.classList.contains('lightbox') ? $[0] + (ext ? '#' + ext : '') : ''