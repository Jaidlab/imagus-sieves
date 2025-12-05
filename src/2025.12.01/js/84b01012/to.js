const low_quality_first = false // Set to true to show lower quality image first. Switch to high quality with TAB. This works when hovering over images. For links, edit the variable in the 'res' field above.

const l=cfg.hz.hiRes&&low_quality_first;
return $[1]==='api-cdn' ? $[1]+$[2]+'image'+$[3]+$[4]+$[5] : this.node.classList?.contains('webm-thumb')||$[0][0]==='a' ? `https://ahrimp4${$[2]}image${$[3]+$[4]}mp4` : `${l?'':'#'}https://wimg${$[2]}image${$[3]+$[4]}#jpg jpeg png gif#\n${l?'#':''}https://wimg${$[2]}sample${$[3]}sample_${$[4]}#jpg jpeg png gif#`