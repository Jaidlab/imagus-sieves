if (location.hostname === 'reddtastic.com' && this.node.closest('.post')?.querySelector('img,video')) return '//reddtastic/' + $[2]

if ($[3] !== 0) return $[3] == '#mp4' ? $[0] : $[2] + '#mp4'
var u, p, c, n = window.location.hostname.slice(-10) == 'reddit.com' && this.TRG || this.node

if (!n) return ''
if (!$[2] && /^\/r\/[^\/]+\/comments\//.test(location.pathname)) {
  u = n.closest('shreddit-post')?.id
  if (u) return 'https://www.reddit.com/by_id/' + u + '.json'
}

if (!this.find_original && n.matches('shreddit-post > a.absolute')) {
  this.find_original = this.find;
  this.find = function(trg, x, y) {
    if (trg.matches?.('faceplate-img')) {
      let href = trg.closest?.('shreddit-post')?.querySelector('a.absolute')?.href;
      if (href) return this.find_original({ href, IMGS_TRG: trg })
    }
    return this.find_original(trg, x, y);
  }
}

if (n.matches('div.link a.thumbnail,div.link a.thumbnail>img, div.link a.title, div.link a.thumbnail.image')) {
  p = n;
  while ((p = p.parentElement) && !p.matches('div.link'));
  u = p && p.dataset, u = u && (u.url || u.hrefUrl)
  if (u && /(v\.redd\.it|\.reddit\.com\/gallery)\//.test(u)) return u
  c = p && p.querySelector('div.expando[data-cachedhtml]')
  c = c && c.getAttribute('data-cachedhtml')
  u = c && c.match(/(?:<a href|(?:class="preview"|<source) src)="([^"]+)/g)
  if (u) {
    u = u.map(function(i) {
      var u = i.slice(i.lastIndexOf('"') + 1).replace(/&amp;/g, '&');
      return u + (i[1] == 's' ? '#mp4' : '')
    });
    u = c.indexOf('<source') != -1 ? u.reverse() : u
    return u.length ? u.join('\n') : ''
  }
  u = p.dataset, u = u.url || u.hrefUrl

} else if (n.matches('a.Post__titleLink')) {
  u = n.closest('.Post__top').querySelector('a.PostThumbnail').href

} else if (
  n.matches('a[data-click-id=body] > div > h3, .Post div > div[role=img], faceplate-img, a.thumbnail > img') ||
  n.matches('shreddit-post > a.absolute') &&
    !n.parentElement.querySelector('faceplate-img:not(.avatar, .shreddit-subreddit-icon__icon, .absolute, .flair-image)') ||
  n.closest('div[data-id="search-media-post-unit"]') ||
  n.closest('[data-testid="post-thumbnail"]')
) {
  // if (/^(?:text|multi_media)$/.test(n.offsetParent?.getAttribute('post-type'))) return ''
  if (/^(?:text)$/.test(n.offsetParent?.getAttribute('post-type'))) return ''
  p = n.closest('div[id^=t3_]');
  if (p && p.querySelector('p, i.icon-text')) return ''
  p = p && p.querySelector('a > .icon-external_link')
  p = p ? p.parentElement : { href: '//www.reddit.com/by_id/t3_' + $[2] + '.json' }
  p = this.find({ href: p.href, IMGS_TRG: n })
  n.title = n.getAttribute('aria-label') || n.title
  return (Array.isArray(p) ? p.join('\n') : (p === null ? 'null' : p)) || ''
}

return u && /^(https?:)?\/\/i\.redd\.?it/.test(u) ? u : ''