var u = $._.match(/(?:<link itemprop="embedUrl" href="|<meta (?:property="og:video:(?:secure_)?url"|name="twitter:player") content=")(https?:\/\/www\.youtube\.com\/embed\/[0-9A-Za-z_-]{11})/)[1]
var c = $._.match(/"clipConfig"\s*:\s*{([^}]+)}/)[1]
var s = Number(c.match(/"startTimeMs"\s*:\s*"(\d+)"/)[1]) / 1000
var e = Number(c.match(/"endTimeMs"\s*:\s*"(\d+)"/)[1]) / 1000
return u + '?start=' + s.toFixed(3) + '&end=' + e.toFixed(3)