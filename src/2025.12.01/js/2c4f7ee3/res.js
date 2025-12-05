const show_background_image = true // True includes background image in album.

const use_country_for_release = '' // To use the release date for a specific country, change '' to a country. For example, 'USA', 'France' or 'South Korea'. For it to work correctly, the text needs to match the country name in releases.

const content_rating_country = 'USA' // Which country to use for content rating.


if(!this.lb_stats){
this.lb_stats = {
views: $._.match(/hed by ([0-9,]+)/)?.[1],
top: $._.match(/Top 250">(\d+)/)?.[1]
}
return {loop:$[0]}
}

const o = JSON.parse($._.match(/<!\[CDATA\[[^{]{0,15}(\{".*?})\n/)?.[1]||'{}')
if(!o.name)return null

const title = o.name
const country = o.countryOfOrigin?.map(i=>i.name).join(', ')
const runtime = $._.match(/(\d+)&nbsp;mins/)?.[1]
const releaseDate = $._.match(RegExp(`class="date">([^<]+)<[^\n]+\n(?:[^<]+<(?!/ul>))*span class="name">(${use_country_for_release||country})<`))||$._.match(/class="date">([^<]+)<.+?span class="name">([^<]+)/s)
const contentRating = $._.match(RegExp(`>${content_rating_country}</span><span class="release-certification-badge"><span class="label">([^<]+)<`))
const genre = o.genre?.join(', ')
const rating = o.aggregateRating?.ratingValue&&(o.aggregateRating?.ratingValue?.toFixed(1)||'undefined')+'/5 ('+o.aggregateRating?.ratingCount.toLocaleString()+')'
const plot = $._.match(/"description" content="([^"]+)/)?.[1]||''
const director = o.director?.map(i=>i.name)
const writer = [...$._.matchAll(/"\/writer\/[^\/]+\/" class="text-slug">([^<]+)/g)].map(i=>i[1])
const cast = [...$._.matchAll(/<a title="([^"]+)" href="[^"]+" class="text-slug tooltip">([^<]+)<\/a>/g)].flatMap((i,n)=>n<18||(!/\([^\)]+\)/.test(i[1])&&n<30)?[i[2],i[1]?.replace(/([^\(]+)(\s\(|$)/,'($1)$2')].filter(Boolean).join(' '):[])
const studio = o.productionCompany?.map(i=>i.name).join(', ')
const views = this.lb_stats.views
const top = this.lb_stats.top

delete this.lb_stats

const altSrc = this.node.parentNode.parentNode?.firstChild?.src

const poster = [o.image?.replace(/.+/,'#$&').replace(/0-\d+-0-\d+/,'0-2000-0-3000')||'',o.image?.replace(/0-\d+-0-\d+/,'0-600-0-900')||'https://s.ltrbxd.com/static/img/icons/touch-icon-192x192.257b84e7.png'].filter(Boolean)

const altPoster = altSrc?.length&&/alternative-/.test(altSrc)?[altSrc?.replace(/.+/,'#$&').replace(/0-\d+-0-\d+/,'0-2000-0-3000')||'',altSrc?.replace(/0-\d+-0-\d+/,'0-600-0-900')||''].filter(Boolean):''

const backgroundImage = show_background_image&&[[$._.match(/data-backdrop2x="([^"]+)/)?.[1].replace(/.+/,'#$&')||'',$._.match(/data-backdrop="([^"]+)/)?.[1]||''].filter(Boolean),'']

const t = [`<span style="font-size: 120%; font-weight: bold;">${title}</span>`,country,[runtime&&(Math.floor(runtime/60)+' hr ').replace('0 hr ','')+runtime%60+' min'+(runtime>60?' ('+runtime+' min)':''),releaseDate&&releaseDate[1]+' ('+releaseDate[2]+')'].filter(Boolean).join(' - '),[genre,contentRating?.[1]].filter(Boolean).join(' - '),[rating&&'<b>&#x2B50;</b> '+rating,views&&'<b>&#128065;&#65039;</b> '+views,top&&'<b>&#128081;</b> '+top].filter(Boolean).join('  '),'\n<b>Plot</b>\n'+plot,director&&'\n<b>Director'+(director.length>1?'s':'')+':</b> '+director.join(', '),writer?.length&&'<b>Writer'+(writer.length>1?'s':'')+':</b> '+writer.join(', '),cast?.length&&'\n<b>Top cast</b>\n'+cast.join('\n'),studio&&'\n<b>Production companies</b>\n'+studio].filter(Boolean).join('\n')

this.TRG.IMGS_ext_data = [altPoster, poster, backgroundImage[0]?.length&&backgroundImage].filter(Boolean).map((i,n)=>[i,(!n?`<imagus-extension type="sidebar">${t}</imagus-extension>`:'')])

return {loop:'imagus://extension'}