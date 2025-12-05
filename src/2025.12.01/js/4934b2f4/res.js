function getPageText(url) {
  const x = new XMLHttpRequest();
  x.open('GET', url, false);
  x.send();
  return x.responseText;
}


function parseGgjs(page) {

    const m = {};

    const caseRegex = /case\s+(\d+):(?:\s*o\s*=\s*(\d+))?/g;
    let keys = [];
    let match;
    while ((match = caseRegex.exec(page)) !== null) {
        const key = parseInt(match[1], 10);
        const value = match[2] ? parseInt(match[2], 10) : null;

        keys.push(key);
		
        if (value !== null) {
			// cast the key to a string since `gg.s()` returns a string
            keys.forEach(k => m[k.toString()] = value);
            keys = [];
        }
    }

    const ifRegex = /if\s+\(g\s*===?\s*(\d+)\)[\s{]*o\s*=\s*(\d+)/g;
    while ((match = ifRegex.exec(page)) !== null) {
        m[parseInt(match[1], 10)] = parseInt(match[2], 10);
    }

    const defaultMatch = page.match(/(?:var\s|default:)\s*o\s*=\s*(\d+)/);
    const defaultValue = defaultMatch ? parseInt(defaultMatch[1], 10) : 0;

    const bMatch = page.match(/b:\s*["'](.+?)["']/);
    const b      = bMatch ? bMatch[1].replace(/^\/|\/$/g, '') : null;

    return [m, b, defaultValue];
}



const urlDomain = '.gold-usergeneratedcontent.net/'

let ggjs = getPageText('https://ltn' + urlDomain + 'gg.js');
eval(ggjs.match(/(gg = .*)/s)[1]);

const [m, b, defaultValue ] = parseGgjs(ggjs);

var galleryId=$[1];

eval(getPageText('https://ltn' + urlDomain + 'galleries/' + galleryId + '.js'));


//Differentiate between gallery links and image links
let pageint = $[2] == "" ? -1 : parseInt($[2]);

let res=[];
for (let i=0; i<galleryinfo.files.length; i++) {
  
  if(pageint != -1 && pageint != i + 1)
    continue;

  let img = galleryinfo.files[i];

  // TODO: figure out the `avif` file url
  //let imtype;
  //if(img.hasavif == 1) {
  //  imType = "avif";
  //}
  //else {
  //  imType = "webp";
  //}
  let imType = 'webp'
  
  let imHash = img.hash;
  let imNum = gg.s(imHash)
  // The left operand SHOULD just be the first letter of the filetype
  // e.g. `imtype[0]`, but it 404's using `a[vif]`
  let subDomain = 'w' + ((m[imNum] ?? defaultValue) + 1)
  
  let link = "https://" + subDomain + urlDomain + b  + '/' + imNum + '/' + imHash + '.' + imType;
  
  console.debug(link);

  res.push([link]);
}

return res;