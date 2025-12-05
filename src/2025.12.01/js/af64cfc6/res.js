if($[1].includes('//old.reddit.com/')){
$=[...$._.matchAll(/<p><a href="(https?:\/\/(?:preview\.redd\.it|reddit\.com\/link)\/[^"]+)/g)].map(i=>[i[1].replace(/&amp;/g,'&')])
return $.length ? $ : !1
}
var t, r=['<meta[^>]+?property=[\'"]?og:','[\'"]?\\s[^>]*?content=[\'"]([^\'">]+)'], m = $._.match(RegExp(r[0]+'image(?::url)?'+r[1]))
return m ? [m[1], (t = $._.match(RegExp(r[0]+'title'+r[1])))&&t[1]] : !1