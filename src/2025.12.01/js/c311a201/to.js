if($[3]){
const n=this.node
return n.dataset?.video||n.offsetParent?.dataset?.video||''
}
return `${$[1]}1080${$[2]}\n${$[1]}600${$[2]}\n${$[1]}480${$[2]}\n${$[1]}300${$[2]}\n${$[1]}180${$[2]}`