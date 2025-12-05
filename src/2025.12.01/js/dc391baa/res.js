const rx = /src="(data\/media\/.*?\.jpe?g)"/g;
const m = [...$._.matchAll(rx)].map(e => [e[1], ""]);
if (!m.length) return;
return m;