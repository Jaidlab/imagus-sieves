if($._[0]!=='[')return {loop:$._.match(/"mp4","videoUrl":"([^"]+)/)[1].replace(/\\/g,'')}
return JSON.parse($._)[0].videoUrl