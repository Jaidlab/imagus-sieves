if($[1].indexOf('%')>0)$[1] = decodeURIComponent($[1])
return /^http/.test($[1]) ? $[1] : '//' + $[1]