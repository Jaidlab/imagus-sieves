let n=this.node.closest('div[data-href]')?.getAttribute('data-href');
return n ? $[2]+n : $[1]+($[3]==='_thumb'?'_lg.mp4':$[4])