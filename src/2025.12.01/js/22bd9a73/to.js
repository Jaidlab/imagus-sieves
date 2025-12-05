let n=this.node;
n=n.parentNode?.parentNode?.querySelector('img[class="thumb_g"]')?.src?.match(/^.+fname=(http.+)/)?.[1];
return !$[1]&&n?decodeURIComponent(n):$[1]||''