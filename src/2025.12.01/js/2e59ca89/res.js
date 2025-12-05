const m = /video playsinline src="([^"]+)/.exec($._)
if (m) return m[1];
return "//i.imgur.com/ejZcAGv.png";