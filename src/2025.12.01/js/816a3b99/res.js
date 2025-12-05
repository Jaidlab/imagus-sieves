const res = $._.match(/<div class=["']thumbnail thumbnail-downloadimage["']>[^<]+<img src=["']([^"']+)/)
return res&&res.length?res[1]:''