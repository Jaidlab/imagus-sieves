$=JSON.parse($._).data.children[0].data
return [$.preview?.images[0].variants?.mp4?.source.url.replace(/.+/,'$&#mp4')||$.url, '[' + new Date($.created_utc*1e3).toLocaleString() + '] ' + $.title]