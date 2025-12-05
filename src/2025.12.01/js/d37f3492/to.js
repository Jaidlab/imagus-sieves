var n = window.location.hostname.slice(-10) == 'reddit.com' && this.TRG||this.node
if(!n) return $[0]
if(n.matches('div.link a.thumbnail,div.link a.thumbnail>img, div.link a.title, div.link a.thumbnail.image')) {
	while((n = n.parentNode) && !n.matches('div.link'));
	n=n.getAttribute('data-fullname')
	if(n)return '//redditgif/?'+n
}
return $[0]