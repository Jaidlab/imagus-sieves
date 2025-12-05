let comic = $._.match(/" src="([^"]+)" id="cc-comic"/)[1];
let comicTitle = $._.match(/ title="([^"]*)" src="[^"]+" id="cc-comic"/)[1];
let extra = $._.match(/<div id="aftercomic" onclick='toggleBlock\("aftercomic"\)' style="display:none;" class="mobilehide"><img src='([^']+)'/)[1];
return [[comic, comicTitle], [extra, "Extra"]];