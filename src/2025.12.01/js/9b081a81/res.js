let title = $._.match(/<meta property="og:title" content="(.+?)"/)?.[1] || '';
var pics = /"mediaItems":(\[.+?\])/.exec($._);
pics = JSON.parse(pics[1]);
pics = pics.map(p => [p.baseUrl.replace('/pictures/','/pictures/') + '?im_w=1920', title + ' ‖ ' + p.accessibilityLabel]);

return pics;