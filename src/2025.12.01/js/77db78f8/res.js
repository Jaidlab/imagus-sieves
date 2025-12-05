if($[3]==='s'){
var get_original = true;
return [[[get_original&&$._.match(/<a href="([^"]+)">Download original/)?.[1].replace(/.+/,'#$&'),$._.match(/<img id="img" src="([^"]+)/)[1]],$._.match(/<title>([^<]+)/)[1]]];
}
var loadpage = 50;
var maxpages = $._.match(/Showing (\d+) - (\d+) of (\d+) images/);
var res = this.res || [];

function processLink(link) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', link, false);
  xhr.send();
  const matches = xhr.responseText.match(/src="(https:\/\/[\w.]+\.hath\.network.+?)"/);
  if (matches) {
  res.push([matches[1]]);
  }
}

var pages = $._.match(/https:\/\/(?:g\.e-|e[x-])hentai\.org\/(?:lofi\/)?s\/\w+\/\d+-\d+/g)?.slice(0, loadpage);
pages?.forEach(processLink);
var nextpage = $._.match(/<a href="([^"]+)" onclick="return false">&gt;</);
if(nextpage&&res.length<=80){
this.res = res;
return {loop:nextpage[1]};
}
delete this.res;
console.log(pages);
return res;