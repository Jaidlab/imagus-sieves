const m=['webm','mp4'].includes($[2])
return (m?'v':'w')+$[1]+(m?$[2]:$[3])