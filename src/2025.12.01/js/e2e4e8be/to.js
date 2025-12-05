let id=this.node.closest('div[txid],div[stxid]')
id=id&&(id.getAttribute('txid')||id.getAttribute('stxid'))
return id?'https://bastyon.com/index?video=1&v='+id:$[0]