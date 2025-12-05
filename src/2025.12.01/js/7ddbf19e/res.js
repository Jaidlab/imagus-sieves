if(/<iframe src='/.test($._))return {loop:$._.match(/<iframe src='([^']+)/)[1]}
return [...$._.matchAll(/<img src="([^"]+)" alt="[^"]*" \//g)].map(i=>[i[1]])