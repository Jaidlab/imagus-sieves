function blank_poster() {
  const tt = s => aboveTheFoldData.titleType.text.startsWith(s)
  const type = tt('TV') ? 'tv' : tt('Video Game') ? 'game' : tt('Podcast') ? 'podcast' : tt('Music Video') ? 'music' : 'movie'
  return svg.make('-3 0 30 24', type)
}

function gallery_poster(num) {
  const url = `https://www.imdb.com/title/${mainColumnData.id}/mediaindex/`
  const text = `The other ${num > 1 ? `${num} images are` : `${num} image is`} available<br>in the IMDb gallery`
  return [ svg.make('-3 2 30 24', 'gallery'), `<imagus-extension type="banner" text="${text}" url="${url}"></imagus-extension>` ]
}

function get_images() {
  const poster = n => n ? [ n.url, n.caption.plainText ] : [ blank_poster(), '' ]
  const images = n => n.edges.map(i => i.node.id !== aboveTheFoldData.primaryImage?.id ? [ i.node.url, i.node.caption.plainText ] : undefined).filter(Boolean)
  const result = [ poster(aboveTheFoldData.primaryImage), ...images(mainColumnData.titleMainImages) ]
  if (mainColumnData.titleMainImages.total > result.length)
    result.push(gallery_poster(mainColumnData.titleMainImages.total - result.length + result[0][0].startsWith('data:')))
  if (result.length === 1 && result[0][0].startsWith('data:'))
    result[0][0] = '//' + result[0][0]
  return result
}

function get_header() {
  const ry = aboveTheFoldData.releaseYear
  const tt = aboveTheFoldData.titleType
  let ty = tt.isSeries && ry?.year && ry?.year !== ry?.endYear ? `${ry.year}&ndash;${ry.endYear || ' '}` : ry?.year
  if (tt.id !== 'movie') ty = [ tt.text, ty ].filter(Boolean).join(' ')
  return ty ? `${title} (${ty})` : title
}

function get_runtime() {
  const rt_min = aboveTheFoldData.runtime?.seconds / 60
  return rt_min ? rt_min > 60 ? `${Math.floor(rt_min / 60)} hr ${rt_min % 60} min (${rt_min} min)` : `${rt_min} min` : ''
}

function get_release_date() {
  const rd = mainColumnData.releaseDate
  if (rd && rd.year && rd.month && rd.day)
    return new Date(rd.year, rd.month - 1, rd.day).toLocaleDateString(navigator.language, { year: 'numeric', month: 'short', day: '2-digit' }) + (rd.country ? ` (${rd.country.id})` : '')
}

function get_rating(limit) {
  const rs = aboveTheFoldData.ratingsSummary
  const tr = mainColumnData.ratingsSummary.topRanking
  const top = tr?.rank <= limit ? `Top Rated ${aboveTheFoldData.titleType.text.replace(/^Movie$/, 'Movies')}: #${tr.rank.toLocaleString()}` : ''
  return rs.aggregateRating ? [ `<b>&#x2B50;</b> ${Number(rs.aggregateRating).toFixed(1)} (${rs.voteCount?.toLocaleString()})`, top ].filter(Boolean).join(' &middot; ') : ''
}

function get_principal_credits() {
  const attributes = n => n ? ` <span style="color: silver;">(${n.map(a => a.text).join(', ')})</span>` : ''
  const name = n => n.name.nameText.text + attributes(n.attributes)
  const category = n => `<b>${n.category.text}:</b> ${n.credits.map(name).join(', ')}`
  return aboveTheFoldData.principalCredits?.filter(cr => cr.credits.length).map(category).filter(line => !line.startsWith('<b>Star')).join('\n')
}

function get_top_cast(limit) {
  const attributes = n => n ? ` <span style="color: silver;">(${n.map(a => a.text).join(', ')})</span>` : ''
  const characters = n => n ? ` (${n.map(c => c.node.name).join(', ')})` : ''
  const cast_line = n => n.name.nameText.text + characters(n.creditedRoles?.edges?.[0]?.node?.characters?.edges) + attributes(n.creditedRoles?.edges?.[0]?.node?.attributes)
  return mainColumnData.castV2?.[0]?.credits.slice(0, limit).map(cast_line).join('\n')
}

function get_top_cast_old(limit) {
  const attributes = n => n ? ` <span style="color: silver;">(${n.map(a => a.text).join(', ')})</span>` : ''
  const characters = n => n ? ` (${n.map(c => c.name).join(', ')})` : ''
  const cast_line = n => n.node.name.nameText.text + characters(n.node.characters) + attributes(n.node.attributes)
  return mainColumnData.cast?.edges.slice(0, limit).map(cast_line).join('\n')
}

function get_awards() {
  const wins = mainColumnData.wins
  const noms = mainColumnData.nominationsExcludeWins
  const sum = mainColumnData.prestigiousAwardSummary
  let all = ''
  let prestigious = ''
  if (sum?.wins > 0) prestigious += `Won ${sum.wins} ${sum.award.text}${sum.wins > 1 ? 's' : ''}`
  if (sum?.nominations > 0 && !sum?.wins) prestigious += `Nominated for ${sum.nominations} ${sum.award.text}${sum.nominations > 1 ? 's' : ''}`
  if (wins.total > 0) all += `${wins.total}&nbsp;win${wins.total > 1 ? 's' : ''}${noms.total ? ' & ' : ''}`
  if (noms.total > 0) all += `${noms.total}&nbsp;nomination${noms.total > 1 ? 's' : ''}`
  return prestigious ? `${prestigious} (${all} total)` : all
}

function get_money() {
  const pb = mainColumnData.productionBudget?.budget
  const us = mainColumnData.lifetimeGross?.total
  const ww = mainColumnData.worldwideGross?.total
  const to_string = n => n?.amount ? n.amount.toLocaleString('en-US', { style: 'currency', currency: n.currency, minimumFractionDigits: 0 }) : ''
  return [
    [ 'Budget', pb ? to_string(pb) + ' (estimated)' : '' ],
    [ 'US & Canada Box Office', to_string(us) ],
    [ 'International Box Office', to_string({ amount: ww?.amount - us?.amount, currency: 'USD' }) ],
    [ 'Worldwide Box Office', us?.amount !== ww?.amount ? to_string(ww) : '' ]
  ].flatMap(item => item[1] ? item.join(': ') : []).join('\n')
}

// this.TRG is null when the mouse pointer moved away from the TRG element before loading has been completed
if (this.TRG === null) return

const svg = {
  make: (v, d) => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="360" height="480" viewBox="${v}" style="background-color: #2a2a2a;" fill="#404040">${svg[d]}</svg>`),
  gallery: '<path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22a.5.5 0 0 1 .78 0l2.96 3.7c.26.33.03.81-.39.81H9a.5.5 0 0 1-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"/>',
  game: '<path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-11 7H8v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H4c-.55 0-1-.45-1-1s.45-1 1-1h2V9c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1zm5.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>',
  movie: '<path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>',
  music: '<path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zM8.05 15.54A2.995 2.995 0 0 1 11 12c.35 0 .69.07 1 .18V8c0-1.1.9-2 2-2h2c.55 0 1 .45 1 1s-.45 1-1 1h-2v7.03a3.001 3.001 0 0 1-3.55 2.92c-1.21-.21-2.2-1.2-2.4-2.41z"/>',
  podcast: '<path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15a.998.998 0 0 0-.98-.85c-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08a6.993 6.993 0 0 0 5.91-5.78c.1-.6-.39-1.14-1-1.14z"/>',
  tv: '<path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm-1 14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"/>'
}

const pageProps = JSON.parse($._.match(/NEXT_DATA[^{]+([^<]+)/)[1]).props.pageProps
const aboveTheFoldData = pageProps.aboveTheFoldData
const mainColumnData = pageProps.mainColumnData
const title = aboveTheFoldData.titleText.text
const original_title = aboveTheFoldData.originalTitleText.text
const countries = mainColumnData.countriesDetails?.countries.map(country => country.text).join(', ')
const certificate = aboveTheFoldData.certificate?.rating
const episodes = mainColumnData.episodes?.totalEpisodes.total
const genres = aboveTheFoldData.genres?.genres.map(genre => genre.text).join(', ')
const plot = aboveTheFoldData.plot?.plotText?.plainText
const companies = mainColumnData.production.edges.map(edge => edge.node.company.companyText.text).join(', ')

const sidebar_html = [
  `<span style="font-size: 120%; font-weight: bold;">${get_header()}</span>`,
  title !== original_title ? 'Original title: ' + original_title : '',
  countries,
  [ get_runtime(), episodes ? `${episodes} eps` : '', get_release_date() ].filter(Boolean).join(' &middot; '),
  [ genres, certificate ].filter(Boolean).join(' &middot; '),
  get_rating(1000),
  [ '\n<b>Plot</b>', plot ],
  [ '', get_principal_credits() ],
  [ '\n<b>Top cast</b>', get_top_cast(12) || get_top_cast_old(12) ],
  [ '\n<b>Awards</b>', get_awards() ],
  [ '\n<b>Production companies</b>', companies ],
  [ '\n<b>Financials</b>', get_money() ]
].filter(i => i?.[1]).flat().join('\n')

const res = get_images()
res[0][1] = `<imagus-extension type="sidebar">${sidebar_html}</imagus-extension>${res[0][1]}`
this.TRG.IMGS_ext_data = res

return 'imagus://extension'