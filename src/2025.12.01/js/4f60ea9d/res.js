let n,o=this.imgpile_album,m=[...$._.matchAll(/(?:source |data-)src="([^"]+)/g)].map(i=>[i[1]]),t=[$._.match(/"post-title text-light"[^>]+>([^<]+)/)?.[1],$._.match(/"fas fa-calendar-alt"><\/i>\n\s+<span class="meta-value">([^<]+)/s)?.[1],$._.match(/"post-description"[^>]+>([^<]+)/)?.[1]].filter(Boolean).join(' | ');
delete this.imgpile_album;
if(!o&&t&&m[0])m[0][1]=t;
if(o)m.unshift(...o);
if(n=$._.match(/href="([^"]+)"\s+rel="next"/)?.[1]){
this.imgpile_album=m;
return {loop:n};
}
return m