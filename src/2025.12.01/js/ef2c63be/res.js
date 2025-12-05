// Get movie poster
const poster = !$[1] && [...$._.matchAll(/(?:"postImg postImgAligned img-right"|<div class="post-align" style="text-align: center;"[^&]+?) title="([^"]+)/gs)].pop()?.[1];

// Get page title
const title = $._.match(/title>([^<]+)/)?.[1]||'';

// Get the part of the page source that contains image links
const linksSource = !$[1] && $._.match(/<(?:div class="sp-head folded"><span|h3 class="sp-title")>.+?<!--\/post_body-->/s)?.[0];

// Get image link URLs and their thumbnail URLs
const imgLinks = linksSource ? [...linksSource.matchAll(/<a href="(http[^"]+)" class="postLink"><var class="postImg" title="([^"]+)/g)].map(i => [i[1], i[2]]) : [];

// Get images that don't have a link to another page
const pageImgs = linksSource ? [...linksSource.matchAll(/(?<!class="postLink">)<var class="postImg" title="([^"]+)/g)].map(i => ['', i[1]]) : [];

// Combine image links and and images. Add links first since since some of the page images may not be wanted
const links = [...imgLinks, ...pageImgs]

const rt = this._rutracker_ || {};
let img, i = rt.num + 1 || 0, urls = rt.links || links, imgs = rt.imgs || (poster ? [[poster, title]] : []);

// If the sieve has been looped with an image page, try to get the full size image
if ($[1]) {
  const thumbnail = urls[i-1][1];

  // Test the links for which site it is and try to get the full size image from the page source
  if($[1].includes('imageban.ru/'))img = $._.match(/data-original="([^"]+)/)?.[1];
  else if($[1].includes('fastpic.org/'))img = $._.match(/<img src="([^"]+)" class="image img-fluid"/)?.[1];
  else if($[1].includes('imagevenue.com/'))img = $._.match(/img src="([^"]+)" id="main-image"/)?.[1];

  // If site not supported, try to get the default page image
  else img = $._.match(/property="og:image" content="([^"]+)/)?.[1];

  imgs.push([[img||thumbnail], $[1]]);
}

// Run a for loop to test if the thumbnail can be upgraded to the full size image
for (; i < urls.length; ++i) {
  let link = urls[i][0], thumbnail = urls[i][1];

  // Fastpic page URLs look like image URLs interfering the the sieve looping. Try converting it to HTML URL
  if(link.includes('.fastpic.org/'))link = link.replace(/^(https?:\/\/)i(\d+)\.(fastpic\.org\/)big(\/\d+\/\d+)\/\w+([^.]+\.(?:jpe?|pn)g)$/, '$1$3view/$2$4$5.html');

  // Test if another sieve can upgrade the thumbnail
  img = this.find({src: thumbnail});
  img = img!==thumbnail&&img;

  // If the thumbnail can't be upgraded and the page link isn't an image URL, save the variables in 'this._rutracker_' and loop the sieve with the page URL
  if (!img && link && !/\.(?:jpe?|pn)g(?:\?|$)/.test(link)){
    this._rutracker_ = {
      links: urls,
      imgs: imgs,
      num: i
    }

    // Add '//rutracker_loop/' to URL so it will match this sieve
    return {loop: '//rutracker_loop/' + link};
  }
  imgs.push([[img||link, thumbnail], link]);
}

// Delete 'this._rutracker_' object
delete this._rutracker_;
return imgs;