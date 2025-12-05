const url = $._.match(/setVideoUrlHigh.*\.mp4\?.*?'/)[0].replace(/setVideoUrlHigh.*\('(.*?)'/, '$1');

return url;