if(!$[3])return '//'+$[1]+'film/'+$[2]+'/video/'+$._.match(/"Trailer:(\d+)/)?.[1]
return JSON.parse($._)[$[2]+','+$[3]].streamUrl