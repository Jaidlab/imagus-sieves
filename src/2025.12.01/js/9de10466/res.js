$=[...$._.matchAll(/<(?:source src="([^"]+)|img id="[^"]*"[^>]+src="([^"]+)" height[^>]+alt="([^"]*)"[^>]+style=")/g)];
return $.map(i=>[i[1]||i[2],i[3]||''])