const rx =
  /img src="([^"]+)" style="max\-width:64px;max\-height:64px"\s+index="\d+"/g;
const matches = [...$._.matchAll(rx)];
if (matches.length)
  return matches.map(item => [item[1].replace(/s\-l\d+\./, 's-l9999.'), '']);

const scriptSrc = $._.match(/mediaList":(\[.*?)<\/script>/)?.[1];
if (!scriptSrc) return;

// Find where the mediaList array ends.
let counter = 0,
  end;
for (let i = 0; i < scriptSrc.length; i++) {
  if (scriptSrc[i] === '[') counter++;
  if (scriptSrc[i] === ']') counter--;
  if (counter === 0) {
    end = i + 1;
    break;
  }
}

try {
  return JSON.parse(scriptSrc.slice(0, end)).map(m => [
    m?.image?.originalImg?.URL.replace(/s\-l\d+\./, 's-l9999.'),
    m?.image?.originalImg?.title.trim(),
  ]);
} catch (e) {
  console.log(`eBay Sieve didn't work. Error: ${e}`);
  return;
}