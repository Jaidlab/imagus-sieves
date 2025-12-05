if (!$[3]) return [ $._.match(/http[^?"]+\?dl=1/)[0], $._.match(/="imagename">([^<]+)/)?.[1]||'' ]

if (app.name === 'Imagus mod' && platform.firefox) {
  let n = Number($[5])+1, m = this._postimg_images_ || []
  delete this._postimg_images_
  $._ = JSON.parse($._)
  $._.images.forEach(i => m.push([`https://i.postimg.cc/${i[1]}/${i[2]}.${i[3]}`]))
  if ($._.has_page_next) {
    this._postimg_images_ = m
    return {loop: '//' + $[1] + '-page_num_' + (n || 2)}
  }
  return m
}

if (!this.__bg_request) {
  this.__bg_request_data = {}
  this.__bg_request_id = 9000

  this.__bg_request = url => {
    this.__bg_request_id += 1
    Port.send({
      cmd: 'resolve',
      id: this.__bg_request_id,
      params: { rule: { id: $.rule.id } },
      url: url
    })
    return new Promise(resolve => {
      const loop = (data, id) => data[id] ? (resolve(data[id].params._), delete data[id]) : setTimeout(loop, 100, data, id)
      loop(this.__bg_request_data, this.__bg_request_id)
    })
  }

  Port.listen(d => d ? d.cmd === 'resolved' && d.id > 9000 ? (this.__bg_request_data[d.id] = d, undefined) : this.onMessage(d) : undefined)
}

if (!this.__postimg) {
  const P = this.__postimg = { index: 0 }

  P.get = async (url, spinner) => {
    if (/i\.p(?:ost[il]m(?:g|ages?)|ixxxels)\.(?:cc|org)/.test(url)) return url
    if (spinner) this.show('load')
    const response = await this.__bg_request(url)
    const full_img_url = response.match(/http[^?"]+\?dl=1/)[0]
    this.stack[this.TRG.IMGS_album].every((e, i, a) => e[0] === url ? (a[i][0] = full_img_url, false) : true)
    return full_img_url
  }

  P.orig_set = this.set
  this.set = async s => {
    if (!/p(?:ost[il]m(?:g|ages?)|ixxxels)\.(?:cc|org)/.test(s)) return P.orig_set(s)
    P.index += 1
    const index = P.index
    const full_img_url = await P.get(s, true)
    if (index === P.index) P.orig_set(full_img_url)
  }

  P.orig__preload = this._preload
  this._preload = async s => !/p(?:ost[il]m(?:g|ages?)|ixxxels)\.(?:cc|org)/.test(s) ? P.orig__preload(s) : P.orig__preload(await P.get(s))
}
return Object.entries(JSON.parse($._.match(/embed_value=([^}]+})/)[1])).map(e => [ 'https://' + ($[1]||$[6]).match(/^[^\/]+\//)[0] + e[0], e[1][0] ])