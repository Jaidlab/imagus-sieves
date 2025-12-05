const rx1 = /<meta property="og:video" content="([^"]+)"/g;
const video = rx1.exec($._);
if (video) return (video[1]);

const rx2 = /<meta property="og:image" content="([^"]+)"/g;
const image = rx2.exec($._);
if (image) return (image[1]);
return;