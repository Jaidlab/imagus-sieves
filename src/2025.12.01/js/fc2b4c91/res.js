let m=[...$._.matchAll(/srcSet="([^"\s]+)/g)].map(i=>[i[1].replace(/w_\d+,h_\d+,q_\d+/,'w_1250,h_1750,q_100')]);
if(!m.length)m=$._.match(/src="([^"]+)" srcSet/)?.[1];
return m||''