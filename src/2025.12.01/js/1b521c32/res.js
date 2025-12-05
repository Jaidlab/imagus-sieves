if($.base[0]==='d'){
const xhr=/firefox/i.test(navigator.userAgent) ? new content.XMLHttpRequest() : new XMLHttpRequest();
xhr.open('GET',`https://danbooru.${$[1]}us/posts/${$[2]}.json`,false);
xhr.send();
$._=xhr.responseText;
}
var x = JSON.parse($._);
return x&&x.file_url ? [x.file_url, (x.tag_string_general + (x.tag_string_artist ? ' by ' + x.tag_string_artist : '')).replace(/_/g, " ")] : null