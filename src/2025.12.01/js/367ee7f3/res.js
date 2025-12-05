const x=new XMLHttpRequest()
x.open('POST','https://api.bitchute.com/api/beta/video/media',false)
x.setRequestHeader("Content-Type","application/json")
x.send(`{"video_id":"${$[1]}"}`)
return JSON.parse(x.responseText).media_url