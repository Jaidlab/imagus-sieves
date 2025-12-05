let m=this.node.closest('a[href]')?.nextElementSibling?.href;
return /kinopoisk-ru\.clstorage\.net/.test(m) ? m : $[0]