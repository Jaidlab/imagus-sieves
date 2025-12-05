var t=$._.match(/<title>([^<]+)/)?.[1]
$=$._.match(/(?:id='main_image'|<source)\s+src='([^']+)('\s+type='video\/mp4')?/)
return [$[1]+($[2]?'#mp4':''),t]