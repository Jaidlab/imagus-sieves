$=JSON.parse($._.match(/"__NEXT_DATA__"\s+type="application\/json">({.*?})<\//)?.[1]||'{}').props?.pageProps.ssrCurrentVideo||null
if(!$)return ''
const t=[$.title,$.description].filter(Boolean).join(" | ")
$=$.sources.filter(i=>i.type==="video/mp4"&&i.height).sort((a,b)=>a.height-b.height)
return [[['#'+$.pop().file,$?.[Math.floor($.length/2)]?.file||''],t]]