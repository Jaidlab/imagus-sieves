let comic;

comic = $._.match(/<img src="(https:\/\/(?:files|static)\.explosm\.net\/(?:\d{4}\/\d{2}\/\d+|comics\/[^\/]+)\/[^\.]+\.(?:png|gif|jpg))/);
if (comic)
    comic = comic[1];

// This is a fallback in case the page dynamically loads the comic. It seems only a few pages do that (see notes for an example)
else
    comic = $._.match(/\\"mediaItemUrl\\":\\"(https:\/\/(?:files|static)\.explosm\.net\/(?:\d{4}\/\d{2}\/\d+|comics\/[^\/]+)\/[^\.]+\.(?:png|gif|jpg))\\",/)[1];

return comic;