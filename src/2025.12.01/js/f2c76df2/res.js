var doc = new DOMParser().parseFromString($._, "text/html");
var images = doc.querySelectorAll('img[id^="#sdimg"]');
var imgurls=Array.from(images).map(img => img.src);
var baseurl=$.base.replace(new RegExp('((https?://)?[/]).','gi'), '$1');
var dirurl=$.base.split("/");
dirurl.pop();
dirurl=dirurl.join("/");
var i=imgurls.map(function (item) {
 item = item.replace(/src="/gi, "");
 if ( item.search(/https?:\/\//) == -1) {
   if (item[0] == "/") item = baseurl + item; else item = dirurl + "/" + item;
 }
 return [item, '']; 
});
return i;