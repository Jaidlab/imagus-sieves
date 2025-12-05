const m = /source src="([^"]+)" type="video/.exec($._)
if (m) return m[1];
return "//i.imgur.com/ejZcAGv.png";