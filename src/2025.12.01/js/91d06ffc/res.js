if ($._[0] != '{') $ = false
else $ = JSON.parse($._), $ = [[$.num > 1050? [$.img.replace(/(\.\w+)$/, '_2x$1'), $.img] : $.img, [$.year, ('0'+$.month).slice(-2), ('0'+$.day).slice(-2)].join('-') + ' (#' + $.num + ') | ' + $.safe_title + ' - ' + $.alt + ' ' + $.link]]
return $