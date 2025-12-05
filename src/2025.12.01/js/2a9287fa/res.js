let imgurl=$._.match(/img  id="resizable".*?src="(.*?)"/)[1];

let titlematches = $._.match(/class="boldfont">([^<]*)<\/div>/);

let title;
if(titlematches != null) {
    title = titlematches[1];
}
else {
    let titlematchesstyle2 = $._.match(/<title>([^<]*)<\/title>/);
    title = titlematchesstyle2[1];
}

return [imgurl, title];