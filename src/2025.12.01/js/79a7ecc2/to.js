const n=parseInt(this.node.offsetParent?.getAttribute('data-index'));
if(Number.isNaN(n))return $[0];
const o=[...document.querySelectorAll('[srcset]')][n]?.getAttribute('srcset');
let m=o?.match(/(\/\/\S+\/)\d+x\d+\s/)?.[1];
m=m?m+'orig':o?.match(/(\/\/\S+)\s\d+w$/)?.[1];
return m||$[0];