$ = JSON.parse($._).image
var r = $.representations
return [[
 $.format=='gif' ? ['#'+r.webm, '#'+r.mp4, r.full] : $.width<1200 && $.height<1200 ? [r.full] : ['#' + r.full, r.large],
 ['['+$.created_at+']', $.name, $.description, $.tags, $.source_url].filter(Boolean).join(' | ')
]]