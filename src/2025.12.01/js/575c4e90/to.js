const n=this.node, id=$[0].match(/\/([^\/?.]+)(?:[?.]|$)/)?.[1]||'';

const upgrade = img => '#'+img.replace(/\.([a-z0-9]{3,4}):?\w*$|\?format=(\w+)&.+/,'.$1$2?name=orig').replace('webp','#jpg png#')+'\n'+img.replace(/\.([a-z0-9]{3,4}):?\w*$|\?format=(\w+)&.+/,'.$1$2?name=large').replace('webp','#jpg png#');

if($[2])return $[1]+'1500x500';

if($[3])return n.closest('a')?.querySelector('img[src][draggable="true"]')?.src?.replace(/_[a-z0-9]+\./, '.')||'';

if(!/\b(?:x|twitter)\.com$/.test(location.hostname))return upgrade($[0]);

return (n.closest('article')?.querySelector('a[href*="/status/"][aria-label]')||n.closest('a[href*="/status/"][role="link"]')||n.closest('article,div[class="css-1dbjc4n r-1iusvr4 r-16y2uox r-a5pmau r-bnwqim"],div[class="css-1dbjc4n r-1iusvr4 r-16y2uox r-bnwqim"]')?.querySelector('a[href*="/status/"]')||n.closest('[class="css-175oi2r r-184en5c"]')?.nextSibling?.querySelector('a[href*="/status/"]'))?.href?.replace(/^(https:\/\/[^\/]+\/[^\/]+\/status\/\d+).*/, '$1?img_id/'+id)||upgrade($[0]);