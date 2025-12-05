let highdefinition = true;

let debug = false;

if($.base.startsWith('data:')){
const x=new XMLHttpRequest();
x.open('GET',$[0],false);
x.send();
$._=x.responseText;
}

let singleitemmatch=$._.match(/submission-standarddefURL.*?(https:\/\/\w\w\.ib\.metapix\.net\/files\/screen\/\d+\/\d+[^'\"]*?)['\"]/);
let galleryitemsiterator=$._.matchAll(/<a.*?href=['\"][^'\"]*?pictop['\"].*?src=['\"]([^'\"]*)['\"]/g);
let titlematch = $._.match(/<meta name="og:title" content="(.+)? &lt;/);
let keywordmatch = $._.match(/<meta name="keywords" content="([^"]*)/);

let galleryitemsmatch = Array.from(galleryitemsiterator);

if(debug) console.log($._);
if(debug) console.log(singleitemmatch);
if(debug) console.log(galleryitemsmatch);
if(debug) console.log(titlematch);

let returnval;
let toptext = titlematch[1] + (keywordmatch ? ' | Keywords: '+keywordmatch[1] : '');


//If no single image found, try special cases
if(singleitemmatch == null) {

    //MP3s and Video
    let mp3match = $._.match(/jwplayer-file.*?value=['\"](.*?)['\"]/);
    if(mp3match != null) {
        if(debug) console.log("Video/MP3 Media Context.");
        let mp3medialink = mp3match[1];

        returnval = [
            [mp3medialink, toptext]
        ];
        return returnval;
    }

    //Image from pool case
    let poolmatch = $._.match(/src=['\"](https:\/\/\w\w\.ib\.metapix\.net\/files\/screen\/\d+\/.*?)['\"]/);
    if(poolmatch != null) {
        if(debug) console.log("Pool Image Media Context.");
        let poolmedialink = poolmatch[1];

        returnval = [
            [poolmedialink, toptext]
        ];
        return returnval;
    }

    //Final try for general thumbnail. Happens with literature posts as an example.
    let generalthumbmatch = $._.match(/<meta content=['\"](.*?)['\"] property=['\"]og:image['\"]>/);
    if(generalthumbmatch != null) {
        if(debug) console.log("General Thumbnail Media Context.");
        let generalthumblink = generalthumbmatch[1];

        returnval = [
            [generalthumblink, toptext]
        ];
        return returnval;
    }
    
    console.error("No known media context found.")
    return;
}


let singleimagelink = singleitemmatch[1];

//Split cases where gallery thumbnails are found or default to a single item
if(galleryitemsmatch.length == 0) {
    //No gallery found, transform URL and display based on high def preference and return
    if(debug) console.log("Standard Image Media Context.");

    if(highdefinition) {
        singleimagelink = singleimagelink.replace("/screen/", "/full/");
    }

    returnval = [
        [singleimagelink, toptext]
    ];
}
else {
    if(debug) console.log("Gallery Media Context.");

    returnval = [];

    //Probe for filetypes in main image to guess gallery image filetypes
    let filetype = singleimagelink.match(/(.(jpg|jpeg|png|webp|gif))/)[1];

    let replaceurltext = highdefinition ? "/files/full/" : "/files/screen/";
    for(let i=0; i<galleryitemsmatch.length; i++) {
        let currentthumburl = galleryitemsmatch[i][1];
        currentthumburl = currentthumburl.replace("/thumbnails/medium/", replaceurltext);
        currentthumburl = currentthumburl.replace("_noncustom", "");
        currentthumburl = [currentthumburl.replace(".jpg", filetype), currentthumburl, currentthumburl.replace(".jpg", ".jpeg"), currentthumburl.replace(".jpg", ".png"), currentthumburl.replace(".jpg", ".webp"), currentthumburl.replace(".jpg", ".gif")];
        returnval.push([currentthumburl, toptext])
    }
}

if(debug) console.log("Final Return Value", returnval);
return returnval;