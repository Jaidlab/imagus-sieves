const data = JSON.parse($._);
return data ? [`https://livestreamfails-video-prod.b-cdn.net/video/${data.videoId}`, data.label] : null;