var n=!$[1]&&this.node,x=n&&(n.matches('.Post div>div[role=img]')||n.offsetParent?.offsetParent?.getAttribute('content-href')),u=x;
n && (n.title = n.getAttribute('aria-label') || n.title);
var f=this.find({href:x});
var r=n.parentNode?.getAttribute('data');
r=r&&JSON.parse(r).postId||n?.closest('.text-neutral-content')?.querySelector('.i18n-list-item-post-content')?.getAttribute('post-id');
return x&&(x=(n.closest('.Post')) && (x=x.querySelector('div>a[data-click-id=body][href]')) || f!==false&&f!==''&&x)
? x.href||x
: n&&n.matches('div.link>a.thumbnail>img, .PostThumbnail>img, a>div[role=img]')&&n.parentNode.href||u ? '//rt/?'+(n.parentNode.href||u) : r ? '//reddit.com/by_id/'+r+'.json' : $[0]