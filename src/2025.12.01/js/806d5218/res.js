$=JSON.parse($._)
return $.mediaUrls?.map((i,n)=>[i,!n?[$.title,$.description?.content].join(' | '):''])