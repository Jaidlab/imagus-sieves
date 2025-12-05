const n = this.node.offsetParent.parentNode.attributes.url?.textContent
return n&&/\/video\//.test(n) ? n : '//'+$[1]