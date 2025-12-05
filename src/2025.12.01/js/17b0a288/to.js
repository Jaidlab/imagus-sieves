if(!$[1])$[1] = this.node.offsetParent.querySelector('img[src]')?.src
return $[1] ? ($[2] ? ($[1]||'//') + $[2] : $[1].replace(/\.cf\.\w{3,4}$/, '')) : ''