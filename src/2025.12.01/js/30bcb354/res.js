let o=($._.match(/var originalURL\s*=\s*"([^"]+)/)||[,''])[1]
let l=($._.match(/id="fn_img" src="([^"]+)/)||[,''])[1]
return [[[o&&o.length?'#'+o:'',l]]]