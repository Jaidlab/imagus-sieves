if(/ic_play/.test($[0])){
let m = this.node.closest('div[data-type="video"]')?.firstElementChild.dataset;
return m ? m.src.match(/\/\/[^\/]+/) + m.path + (!/\.mp4/.test(m.path) ? '#mp4' : '') : ''
} else if (/\/small/.test($[0])){
return this.node.offsetParent.firstElementChild.dataset.originSrc
} else {
return $[0]
}