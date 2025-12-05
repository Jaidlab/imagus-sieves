if(/<source src=["']/.test($._))return $._.match(/<source src=["']([^"']+)/)[1]
return [...$._.matchAll(/<img\s+src="([^"]+)/g)].map(i=>[i[1].replace('/m6','')])