var u=decodeURIComponent($[2].replace(/\+/g,' ')),n
this.node.IMGS_fallback_zoom=u
n=this.find({href: u, IMGS_TRG: this.node})
return n&&typeof n!='number'||n===null? (Array.isArray(n) ? n.join('\n') : n) : ($[1]?'':u)